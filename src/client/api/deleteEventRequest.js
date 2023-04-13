export default async (eventId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      }
    })
    if (response.status === 200) return true;
    else {
      console.error('Error deleting event:', response.status);
      return false;
    }
  } catch(err) {
    console.error('Error deleting event:', err);
    return false;
  }
};
