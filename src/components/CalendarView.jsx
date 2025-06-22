import React, { useContext, useState, useMemo, useEffect } from "react";
import { CalendarContext } from "../context/CalendarContext";
import EventFormModal from "./EventFormModal";
import DnDCalendar from "./DnDCalendar";
import "../styles.css";

const CalendarView = () => {
  const { state, dispatch } = useContext(CalendarContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [view, setView] = useState(window.innerWidth <= 600 ? "week" : "month");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    if (windowWidth <= 600) {
      setView("week");
    } else {
      setView("month");
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const handleSelectSlot = ({ start }) => {
    setSelectedEvent({ start, end: start });
    setModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const isConflict = (start, end, idToIgnore = null) => {
    return state.events.some((e) => {
      if (e.id === idToIgnore) return false;
      const eStart = new Date(e.start).getTime();
      const eEnd = new Date(e.end).getTime();
      const newStart = new Date(start).getTime();
      const newEnd = new Date(end).getTime();
      const overlap =
        (newStart < eEnd && newEnd > eStart) ||
        (newStart === eStart && newEnd === eEnd);
      return overlap;
    });
  };

  const handleDrop = ({ event, start }) => {
    const adjustedStart = new Date(start);
    const adjustedEnd = new Date(start);

    if (isConflict(adjustedStart, adjustedEnd, event.id)) {
      alert("Event conflict detected!");
      return;
    }

    dispatch({
      type: "UPDATE_EVENT",
      payload: { ...event, start: adjustedStart, end: adjustedEnd },
    });
  };

  const filteredEvents = useMemo(() => {
    return state.events.filter((event) => {
      const matchesText =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.desc &&
          event.desc.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = categoryFilter
        ? event.category === categoryFilter
        : true;
      return matchesText && matchesCategory;
    });
  }, [state.events, searchTerm, categoryFilter]);

  const eventStyleGetter = (event) => {
    const color = event.color || "#3174ad";
    return {
      style: {
        backgroundColor: color,
        borderRadius: "5px",
        opacity: 0.9,
        color: "white",
        border: "0px",
        display: "block",
        transition: "transform 0.2s ease, opacity 0.2s ease",
      },
    };
  };

  const categories = Array.from(
    new Set(state.events.map((e) => e.category).filter(Boolean)),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className="calendar-container">
        <DnDCalendar
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventDrop={handleDrop}
          view={view}
          onView={setView}
          eventPropGetter={eventStyleGetter}
        />
      </div>

      {modalOpen && (
        <EventFormModal
          event={selectedEvent}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CalendarView;
