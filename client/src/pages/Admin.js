// client/src/pages/Admin.js
import React from 'react';

function Admin() {
  return (
    <div className="admin-container">
      <h2>後台管理</h2>
      <form>
        <input type="text" placeholder="演出名稱" required />
        <input type="text" placeholder="地點" required />
        <input type="datetime-local" required />
        <input type="text" placeholder="票種與票價 (格式：VIP:3000,一般:1800)" required />
        <button type="submit">上架活動</button>
      </form>
      <h3>銷售紀錄</h3>
      <ul>
        <li>演唱會 A - 已售出 120 張 / 剩餘 30 張</li>
      </ul>
    </div>
  );
}

export default Admin;