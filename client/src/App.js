// client/src/App.js
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './components/Navbar.css';
import Login from './pages/Login';
import Register from './pages/Register';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const calcCountdown = (dateString) => {
    const now = new Date();
    const target = new Date(dateString);
    const diff = target - now;
    if (isNaN(target.getTime())) return '尚未公布';
    if (diff <= 0) return '已開始或結束';
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `${days} 天`;
  };

  useEffect(() => {
    const dummyEvents = [
      {
        _id: '1',
        artist: '周杰倫',
        location: '台北小巨蛋',
        datetime: '2025-08-30T19:00:00',
        tickets: [
          { type: 'VIP', price: 3000 },
          { type: '普通', price: 1800 }
        ],
        coverUrl: 'https://res.klook.com/image/upload/x_0,y_10,w_1448,h_2027,c_crop/v1729218897/events_admin/aule8gisztpybjxqn5yl.jpg',
        genre: '流行'
      },
      {
        _id: '2',
        artist: '林俊傑',
        location: '高雄巨蛋',
        datetime: '2025-09-12T20:00:00',
        tickets: [
          { type: 'A區', price: 2600 },
          { type: 'B區', price: 1600 }
        ],
        coverUrl: 'https://hips.hearstapps.com/hmg-prod/images/465831696-18344931247123631-606367929049763895-n-673ffd15b25e6.jpg',
        genre: '抒情'
      },
      {
        _id: '3',
        artist: 'BLACKPINK',
        location: '台中洲際棒球場',
        datetime: '2025-10-01T19:30:00',
        tickets: [
          { type: '搖滾區', price: 4800 },
          { type: '看台區', price: 3200 }
        ],
        coverUrl: 'https://upload.wikimedia.org/wikipedia/zh/6/6f/BLACKPINK_2018_Tour%E3%80%8CIn_Your_Area%E3%80%8DSeoul_x_BC_Card.png',
        genre: 'K-POP'
      }
    ];
    setEvents(dummyEvents);
    setLoading(false);
  }, []);

  const filteredEvents = events.filter(event => {
    const artist = event.artist || '';
    const location = event.location || '';
    return (
      artist.toLowerCase().includes(search.toLowerCase()) ||
      location.toLowerCase().includes(search.toLowerCase())
    );
  });

  const carouselItems = filteredEvents.map(event => (
    <div className="carousel-item" key={event._id}>
      {event.coverUrl && (
        <img src={event.coverUrl} alt={event.artist} className="carousel-img" />
      )}
      <h3>{event.artist}</h3>
    </div>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.png" className="App-logo" alt="logo" />
        <h1>🎫 演唱會票務平台</h1>
        <p>查詢最新演出活動，立即購票！</p>
        <input
          type="text"
          className="search-input"
          placeholder="🔍 搜尋歌手或地點..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredEvents.length > 0 && (
          <Carousel
            autoPlay
            autoPlaySpeed={3000}
            infinite
            responsive={{
              desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 },
              tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
              mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
            }}
            arrows
            draggable
            swipeable
            pauseOnHover
            keyBoardControl
            showDots={false}
          >
            {carouselItems}
          </Carousel>
        )}
      </header>

      <main className="p-4">
        {loading && <p>🔄 載入中，請稍候...</p>}

        <section>
          {filteredEvents.map(event => (
            <article key={event._id} className="card">
              <div className="card-content">
                {event.coverUrl && (
                  <img src={event.coverUrl} alt="封面" className="cover-img" />
                )}
                <h2>
                  {event.artist}
                  {event.genre && <span className="badge">{event.genre}</span>}
                </h2>
                <p>📍 <strong>地點：</strong>{event.location?.trim() || '尚未公布'}</p>
                <p>🕒 <strong>時間：</strong>
                  {event.datetime
                    ? new Date(event.datetime).toLocaleString('zh-TW')
                    : '尚未公布'}
                </p>
                <p>⏳ <strong>倒數：</strong>{calcCountdown(event.datetime)}</p>
                <p>💰 <strong>票價：</strong>
                  {(event.tickets || []).map(t => `${t.type} $${t.price}`).join(', ')}
                </p>
                <button
                  className="button"
                  onClick={() => alert(`搶票功能尚未實作（活動 ID：${event._id}）`)}>
                  立即搶票
                </button>
              </div>
            </article>
          ))}

          {!loading && filteredEvents.length === 0 && (
            <p>📭 找不到符合條件的演出活動。</p>
          )}
        </section>
      </main>
    </div>
  );
}

function App() {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('email'));
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUserEmail(null);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="navbar">
        <h2><Link to="/">🎫 演唱會平台</Link></h2>
        <div className="nav-links">
          {userEmail ? (
            <div className="user-info">
              <img src="/logo192.png" alt="使用者" className="user-avatar" />
              <span>{userEmail}</span>
              <button onClick={logout}>登出</button>
            </div>
          ) : (
            <>
              <Link to="/login">登入</Link>
              <Link to="/register">註冊</Link>
            </>
          )}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;