export default async (eventId, updatedEvent) => {
  try {
    const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_name: updatedEvent.event_name,
        industry: updatedEvent.industry,
        event_type: updatedEvent.event_type,
        event_description: updatedEvent.event_description,
        host_id: updatedEvent.host_id,
        total_attendees: updatedEvent.total_attendees,
        event_location: updatedEvent.event_location,
        event_status: updatedEvent.event_status,
        date_time: updatedEvent.date_time,
        event_price: updatedEvent.event_price,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error updating event: ', err);
  }
};
