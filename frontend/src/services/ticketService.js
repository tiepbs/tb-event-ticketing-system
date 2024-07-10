const buyTicket = async (token, ticketInfo) => {
    const response = await fetch('/tickets/buy-ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(ticketInfo),
    });
    return response.json();
  };
  
  export { buyTicket };
  