// client/src/pages/TicketPage.js
import { useEffect, useState } from 'react';

function TicketPage() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  const handleBuy = async (eventId, ticketType) => {
    try {
      const res = await fetch('http://localhost:5000/api/order/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, ticketType }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage('⚠️ 搶票失敗啦主人～伺服器可能爆炸了嗚嗚 QQ');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🎫 秒殺搶票系統</h1>
      {message && <p className="mb-4 text-pink-600 font-bold">{message}</p>}

      {events.map((event) => (
        <div key={event._id} className="border p-4 my-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">{event.artist}</h2>
          <p>📍 {event.location}</p>
          <p>🕒 {new Date(event.datetime).toLocaleString()}</p>
          <div className="mt-4 space-y-2">
            {event.tickets.map((ticket, i) => (
              <div key={i} className="flex justify-between items-center border rounded px-4 py-2">
                <span>
                  🎟️ {ticket.type}｜${ticket.price} 元
                </span>
                <button
                  onClick={() => handleBuy(event._id, ticket.type)}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded"
                >
                  搶票！
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TicketPage;
