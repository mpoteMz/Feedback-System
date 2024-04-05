// src/FeedbackForm.js
import React, { useState } from 'react';

const FeedbackForm = () => {
    const [feedback,name, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        console.log(e);
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedback }),
            });
            if (response.ok) {
                console.log('Feedback submitted successfully!');
                // Optionally, reset the form
                setFeedback('');
            } else {
                console.error('Failed to submit feedback:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div className="feedback-container">
            <h2>Feedback Form</h2>
            <form onSubmit={handleSubmit} className="feedback-form">
                <div className="form-group">
                <label htmlFor="name">Your Name:</label>
                    <input
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Enter your name"
                        required
                    ></input>
                    <label htmlFor="feedback">Your Feedback:</label>
                    <textarea
                        id="feedback"
                        name="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Enter your feedback"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-btn">Submit Feedback</button>
            </form>
        </div>
    );
};

export default FeedbackForm;
