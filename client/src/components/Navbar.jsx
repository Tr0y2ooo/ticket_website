// client/src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🎫 演唱會平台</Link>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/profile">我的票券</Link>
            <Link to="/orders">訂單查詢</Link>
            <Link to="/account">個人資料</Link>
            <button className="logout-btn" onClick={() => {
              localStorage.removeItem('token');
              window.location.reload();
            }}>登出</button>
          </>
        ) : (
          <>
            <Link to="/login">登入</Link>
            <Link to="/register">註冊</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;