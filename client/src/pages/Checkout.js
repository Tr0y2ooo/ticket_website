// client/src/pages/Checkout.js
import React from 'react';
import { useParams } from 'react-router-dom';

function Checkout() {
  const { eventId } = useParams();

  return (
    <div className="checkout-container">
      <h2>購票流程</h2>
      <p>活動 ID：{eventId}</p>
      <form>
        <select required>
          <option value="">選擇區域</option>
          <option value="VIP">VIP</option>
          <option value="一般">一般</option>
        </select>
        <input type="number" min="1" placeholder="張數" required />
        <button type="submit">模擬付款</button>
      </form>
    </div>
  );
}

export default Checkout;