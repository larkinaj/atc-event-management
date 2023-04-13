export default async (event) => {
  try {
    const response = await fetch('http://localhost:3000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_name: event.event_name,
        industry: event.industry,
        event_type: event.event_type,
        event_description: event.event_description,
        host_id: event.host_id,
        total_attendees: event.total_attendees,
        event_location: event.event_location,
        event_status: event.event_status,
        date_time: event.date_time,
        event_price: event.event_price,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error creating event: ', err);
  }
};
