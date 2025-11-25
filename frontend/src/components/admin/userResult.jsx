import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './userResult.css';
const UserResult = ({ user }) => {
  const initial = user.username ? user.username.charAt(0).toUpperCase() : '?';

  const deleteUser = () => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:5000/api/users/${user._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(() => alert('User deleted successfully'))
    .catch(error => console.error('Error deleting user:', error));

    console.log(`Deleted user with ID: ${user._id}`);
  };

  return (
    <Card className="user-result-card shadow-lg">
      <Card.Body>
        <div className="user-avatar">{initial}</div>

        <Card.Title className="user-name">{user.username}</Card.Title>
        <Card.Text className="user-email">{user.email}</Card.Text>

        <Button 
          variant="dark"
          className="delete-btn"
          onClick={deleteUser}
        >
          Delete User
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserResult;
