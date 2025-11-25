'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import SearchResults from './searchResults';
import './search.css';

function AdminSearch() {
  const [query, setQuery] = useState('');
  const [searchUsers, setSearchUsers] = useState(true); // default selected
  const [searchChats, setSearchChats] = useState(true); // default selected
  const [userResults, setUserResults] = useState([]);
  const [chatResults, setChatResults] = useState([]);

  const currentUserId = useSelector((state) => state.auth.userId);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const token = localStorage.getItem('token');

      // Build query parameters based on selection
      const promises = [];

      if (searchUsers) {
        const usersPromise = fetch(
          `http://localhost:5000/api/users/search?username=${encodeURIComponent(query)}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        ).then(res => res.ok ? res.json() : []);
        promises.push(usersPromise);
      }

      if (searchChats) {
        const chatsPromise = fetch(
          `http://localhost:5000/api/chats/search?chatName=${encodeURIComponent(query)}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        ).then(res => res.ok ? res.json() : []);
        promises.push(chatsPromise);
      }

      const [usersData = [], chatsData = []] = await Promise.all(promises);

      setUserResults(usersData);
      setChatResults(chatsData);
      console.log('Search Results:', { usersData, chatsData });
    } catch (err) {
      console.error('Error fetching results:', err);
      setUserResults([]);
      setChatResults([]);
    }
  }

  return (
    <>
      <Navbar className="bg-body-tertiary py-2">
        <Container className="justify-content-center">
          <Form className="d-flex w-100" onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                variant={searchUsers ? 'primary' : 'outline-primary'}
                onClick={() => setSearchUsers(prev => !prev)}
              >
                Users
              </Button>
              <Button
                variant={searchChats ? 'primary' : 'outline-primary'}
                onClick={() => setSearchChats(prev => !prev)}
              >
                Chats
              </Button>
              <Button type="submit" variant="success">
                Search
              </Button>
            </InputGroup>
          </Form>
        </Container>
      </Navbar>
      {(userResults.length > 0 || chatResults.length > 0) && (
  <SearchResults Results={{ userResults, chatResults }} />
)}

    </>
  );
}

export default AdminSearch;
