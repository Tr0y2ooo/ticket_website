// client/src/App.js
/*
import { useEffect, useState } from 'react';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🎤 演唱會活動</h1>
      {events.map(event => (
        <div key={event._id} className="border p-4 my-2 rounded">
          <h2 className="text-xl">{event.artist}</h2>
          <p>📍 地點：{event.location}</p>
          <p>🕒 時間：{new Date(event.datetime).toLocaleString()}</p>
          <p>💰 票價：{event.tickets.map(t => `${t.type} $${t.price}`).join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
*/
// client/src/App.js
import TicketPage from './pages/TicketPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TicketPage />
    </div>
  );
}

export default App;
