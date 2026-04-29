import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

// ✅ azure  Backend URL
const BASE_URL = "https://event-backend-hzc0dxg0drb8a3h3.koreacentral-01.azurewebsites.net";

const RegistrationModal = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    dept: '',
    email: ''
  });
  
  const [status, setStatus] = useState('idle'); 
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const payload = {
      ...formData,
      eventId: event.id,
      eventName: event.name,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/register`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 409) {
        setStatus('duplicate');
        setMessage('You are already registered for this event.');
        return;
      }

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setStatus('success');
      setMessage('Successfully registered for the event!');
      
      setTimeout(() => {
        onClose();
      }, 2500);

    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('Backend not reachable. Please try again later.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <h2>Register for Event</h2>
          <p>{event.name}</p>
        </div>

        {status === 'success' && (
          <div className="status-msg status-success">{message}</div>
        )}
        
        {status === 'error' && (
          <div className="status-msg status-error">{message}</div>
        )}

        {status === 'duplicate' && (
          <div className="status-msg status-error">{message}</div>
        )}

        {status === 'loading' ? (
          <LoadingSpinner />
        ) : status !== 'success' && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="roll">Roll Number</label>
              <input
                type="text"
                id="roll"
                name="roll"
                className="form-input"
                required
                value={formData.roll}
                onChange={handleChange}
                placeholder="Ex: 230701000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dept">Department</label>
              <input
                type="text"
                id="dept"
                name="dept"
                className="form-input"
                required
                value={formData.dept}
                onChange={handleChange}
                placeholder="Computer Science"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="secondary-btn" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-primary"
              >
                Submit Registration
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;