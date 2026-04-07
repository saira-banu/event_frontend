import React from 'react';

const EventCard = ({ event, onRegisterClick }) => {
  // Direct image URLs for your two events
  const getEventImage = () => {
    if (event.name === 'AI Workshop') {
      return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }
    if (event.name === 'Web Development' || event.name === 'Business Pitch Fest') {
      return 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }
    // For other events, use the passed image or placeholder
    return event.image || 'https://via.placeholder.com/400x200/1e293b/818cf8?text=Event+Image';
  };

  return (
    <div className="event-card glass-panel">
      <img
        src={getEventImage()}
        alt={event.name || 'Event'}
        className="event-image"
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <div className="event-content">
        <h3 className="event-title">{event.name || 'Unnamed Event'}</h3>
        <div className="event-date-location">
          <span>📅 {event.date || 'Coming Soon'}</span>
          <span>📍 {event.location || 'Online / TBA'}</span>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => onRegisterClick(event)}
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;