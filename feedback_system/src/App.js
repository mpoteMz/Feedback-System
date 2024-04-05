import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import StarRating from './StarRating';
import './FeedbackForm.js';
import './App.css';
import logo from './feedback_image.jpg';
const socket = io('http://localhost:3000'); // Connect to the Socket.io server


function App() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        // Get feedbacks from the server
        fetchFeedbacks();
        
        // Listen for new feedbacks from the server
        socket.on('feedback', (feedback) => {
            setFeedbacks((prevFeedbacks) => [...prevFeedbacks, feedback]);
        });

        return () => {
            socket.off('feedback'); // Clean up socket event listener
        };
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await fetch('http://localhost:3000/feedback');
            if (response.ok) {
                const data = await response.json();
                setFeedbacks(data);
            } else {
                console.error('Failed to fetch feedbacks:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleSubmit = async (e) => {
      let data = {};
        data.name = name;
        data.email = email;
        data.rating = rating;
        data.message = message;
      e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                console.log('Feedback submitted successfully');
                setName('');
                setEmail('');
                setMessage('');
                setRating(0);
                fetchFeedbacks();
                // Emit the feedback submitted to the server
                socket.emit('submitFeedback', data.name); 
            } else {
                console.error('Failed to submit feedback:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
      <div className="feedback-form">
        <div className="row" style={{ height: '350px',padding: '10px',background: 'skyblue'}}>
            <img src={logo} style={{width:'100%', height: '100%', objectFit:'cover'}} alt="Feedback" />
            </div>
            <div className="form-area d-flex" style={{overflowY: 'scroll',height: '400px'}}>
          <div className="left-section">
          <form onSubmit={handleSubmit}>
          <h3>Add new feedback</h3>
              <div className="col-md-3 form-group">
                  <label htmlFor="name">Name*</label>
                  <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="feedback">Message*</label>
                  <textarea
                      id="feedback"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      style={{resize: 'none', rows: '2' }}
                      required
                  ></textarea>
              </div>
              <div className="form-group">
                    <label>Rating:</label>
                    <div>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span
                                key={value}
                                className={value <= rating ? 'star filled' : 'star'}
                                onClick={() => handleRatingChange(value)}
                            >
                                &#9733;
                            </span>
                        ))}
                    </div>
                </div>
              <button className="submit-button" type="submit">Submit</button>
          </form>
          </div>
          <div className="right-section">
            <h3>Feedback Received (Latest is displayed first)</h3>
            <ol>
                {feedbacks.map((feedback, index) => (
                    <li key={index}>Feedback Received from:&nbsp;<b>{feedback.name}</b><br/>Email:<b>{feedback.email}</b><br/>Message:<b>{feedback.message}</b><br/>Rating: <StarRating rating={feedback.rating} /><br/></li>
                    
                ))}
            </ol>
          </div>
          </div>
      </div>

  );
}

export default App;
