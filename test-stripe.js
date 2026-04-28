const fetch = require('node-fetch');
(async () => {
  const res = await fetch('https://public-transport-app-c7u6.onrender.com/api/payment/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 50, ticketType: 'daily_pass' })
  });
  const data = await res.json();
  console.log(JSON.stringify(data));
})();
