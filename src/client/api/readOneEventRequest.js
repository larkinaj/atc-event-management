export default async (eventId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json();
    return data;
  } catch(err) {
    console.error('Error fetching data: ', err);
  }
};
