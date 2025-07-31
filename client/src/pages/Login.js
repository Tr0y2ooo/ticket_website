import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // ✅ 用初始化後的 auth

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('登入成功');
      localStorage.setItem('email', email);
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error(error);
      toast.error('帳號或密碼錯誤');
    }
  };

  return (
    <div className="form-container">
      <img src="/login.svg" alt="logo" className="form-logo" />
      <h2>登入</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="電子郵件"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">登入</button>
      </form>
      <p className="form-forgot">
        <a href="/forgot-password">忘記密碼？</a>
      </p>
      <p className="form-bottom-text">
        還沒有帳號？<Link to="/register">立即註冊</Link>
      </p>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Login;
