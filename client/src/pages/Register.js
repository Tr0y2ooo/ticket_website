// client/src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('請填寫所有欄位');
      return;
    }

    // ✅ 檢查信箱格式
    const validEmail = /^[\w.-]+@(?:gmail\.com|yahoo\.com\.tw|ntu\.edu\.tw)$/;
    if (!validEmail.test(email)) {
      toast.error('請輸入有效的信箱（例如 @gmail.com, @yahoo.com.tw）');
      return;
    }

    // ✅ 密碼需符合：英文與數字混合，長度剛好 8 碼
    const validPwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/;
    if (!validPwd.test(password)) {
      toast.error('密碼需為英文與數字混合，且長度為 8 碼');
      return;
    }

    try {
      // ✅ Firebase 註冊帳號
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success('註冊成功！請登入');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('此信箱已被註冊');
      } else {
        toast.error('註冊失敗，請稍後再試');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>註冊</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="電子郵件（限 @gmail.com / @yahoo.com.tw）"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="密碼（英文+數字，共8碼）"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">註冊</button>
      </form>
      <p className="login-link">
        已有帳號？ <a href="/login">立即登入</a>
      </p>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Register;
