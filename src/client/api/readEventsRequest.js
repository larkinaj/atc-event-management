export default async () => {
  try {
    const response = await fetch('http://localhost:3000/api/events/allEvents', {
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