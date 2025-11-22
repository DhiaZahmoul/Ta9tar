
'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import ContactList from '../contacts/contactList';
import './headerForm.css';

function Search({ onAddUser }) {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);

  const currentUserId = useSelector((state) => state.auth.userId);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/users/search?username=${encodeURIComponent(username)}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();

      // Only include valid users and filter out current user
      const filteredUsers = data.filter(u => u && u._id && u._id !== currentUserId);
      setUsers(filteredUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    }
  }
// Render component
//Uses Bootstrap for styling
//Includes ContactList to show found users
  return (
    <>
      <Navbar className="bg-body-tertiary py-2">
        <Container className="justify-content-center">
          <Form className="d-flex w-100" onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button type="submit" variant="primary">
                Search
              </Button>
            </InputGroup>
          </Form>
        </Container>
      </Navbar>

      {users.length > 0 && <ContactList users={users} onAddUser={onAddUser} />}
    </>
  );
}

export default HeaderForm;
