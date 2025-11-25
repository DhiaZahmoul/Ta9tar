import React from 'react';
import UserResult from './userResult';
import ChatResult from './chatResult';
import './searchResult.css';
const SearchResults = ({ Results}) => {
  if (!Results || (Results.userResults?.length === 0 && Results.chatResults?.length === 0)) {
    return (
      <div className="no-results">
        <p>No results found.</p>
      </div>
    );
  }

  return (
    <div className="search-results-container">

      {/* USER RESULTS */}
      {Results.userResults && Results.userResults.length > 0 && (
        <div className="user-results-section">
          <h3 className="results-title">User Results</h3>
          <div className="results-grid">
            {Results.userResults.map((user) => (
              <UserResult key={user._id} user={user} />
            ))}
          </div>
        </div>
      )}

      {/* CHAT RESULTS */}
      {Results.chatResults && Results.chatResults.length > 0 && (
        <div className="chat-results-section">
          <h3 className="results-title">Chat Results</h3>
          <div className="results-grid">
            {Results.chatResults.map((chat) => (
              <ChatResult key={chat._id} chat={chat}  />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default SearchResults;
