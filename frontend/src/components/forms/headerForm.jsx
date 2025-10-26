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

function HeaderForm({ onAddUser }) {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);

  // ✅ Get current user ID from Redux
 const currentUserId = useSelector((state) => state.auth.userId);



  async function handleSubmit(e) {
    e.preventDefault();
    if (username.trim() === '') return;

    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/api/users/search?username=${encodeURIComponent(username)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      console.error('Error fetching users');
      return;
    }

    const data = await response.json();

    // ✅ Filter out current user
    const filteredUsers = data.filter(user => user._id !== currentUserId);

    setUsers(filteredUsers); // update search results
  }

  return (
    <>
      <Navbar className="bg-body-tertiary py-2">
        <Container className="justify-content-center">
          <Form className="d-flex w-100" onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by username..."
                aria-label="Username"
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

      {/* Render ContactList dynamically with onAddUser */}
      {users.length > 0 && <ContactList users={users} onAddUser={onAddUser} />}
    </>
  );
}

export default HeaderForm;
