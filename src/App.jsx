import React, { useState, useEffect } from 'react';
import EventCard from './components/EventCard';
import RegistrationModal from './components/RegistrationModal';
import LoadingSpinner from './components/LoadingSpinner';

const BASE_URL = "https://event-backend-mzk6.onrender.com";

const dummyEvents = [
  { id: '1', name: 'Tech Symposium 2024', date: 'Oct 15, 2024', location: 'Main Auditorium', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: '2', name: 'Design Hackathon', date: 'Nov 02, 2024', location: 'Innovation Lab', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: '3', name: 'AI Workshop', date: 'Dec 10, 2024', location: 'Virtual', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: '4', name: 'Business Pitch Fest', date: 'Jan 20, 2025', location: 'Conference Hall B', image: 'https://images.unsplash.com/photo-1556761175-5973fb0f32f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  

const fetchEvents = async () => {
  try {
    setLoading(true);

    const response = await fetch(`${BASE_URL}/events`);

    if (!response.ok) {
      throw new Error('Failed to reach backend API');
    }

    const data = await response.json();
    setEvents(data);
    setError(null); // ✅ remove error if success

  } catch (err) {
    console.error('Backend error:', err);

    // ❌ REMOVE confusing localhost message
    setError('Backend not reachable. Please try again later.');

    // optional fallback (you can keep or remove)
    setEvents(dummyEvents);

  } finally {
    setTimeout(() => setLoading(false), 500);
  }
};

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>TechFusion Events</h1>
        <p>Discover and register for upcoming technological and cultural extravaganzas.</p>
        
        {error && (
          <div className="status-msg status-error" style={{marginTop: '1rem', display: 'inline-block'}}>
            ⚠️ {error}
          </div>
        )}
      </header>

      <main>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="event-grid">
            {events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onRegisterClick={handleRegisterClick} 
              />
            ))}
          </div>
        )}
      </main>

      {selectedEvent && (
        <RegistrationModal 
          event={selectedEvent} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default App;
