// Frontend: React.js
// File: src/App.js

import React, { useState, useEffect } from "react";
import EventForm from "./components/EventForm";
import EventCard from "./components/EventCard";
import SearchBar from "./components/SearchBar";

function App() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch events from the backend
  useEffect(() => {
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Filter events based on search query
  useEffect(() => {
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchQuery, events]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className="App">
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">University Events</h1>
      </header>
      <main className="container mx-auto p-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <EventForm addEvent={addEvent} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
