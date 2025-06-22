import React, { createContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { expandRecurringEvents } from "../utils/recurrenceUtils";

export const CalendarContext = createContext();

const initialState = {
  events: [],
};

const calendarReducer = (state, action) => {
  switch (action.type) {
    case "INIT_EVENTS":
      return { ...state, events: action.payload };
    case "ADD_EVENT": {
      const baseId = uuidv4();
      const baseEvent = { id: baseId, recurrenceId: baseId, ...action.payload };
      const expanded = expandRecurringEvents(baseEvent);
      return { ...state, events: [...state.events, ...expanded] };
    }
    case "UPDATE_EVENT": {
      const updatedEvent = { ...action.payload };
      // Remove all existing recurrence instances
      const filteredEvents = state.events.filter(
        (ev) =>
          ev.recurrenceId !== updatedEvent.recurrenceId &&
          ev.id !== updatedEvent.id,
      );

      // Expand updated recurrence
      const expanded = expandRecurringEvents(updatedEvent);
      return {
        ...state,
        events: [...filteredEvents, ...expanded],
      };
    }

    case "DELETE_EVENT":
      if (action.payload.recurrenceId) {
        return {
          ...state,
          events: state.events.filter(
            (ev) => ev.recurrenceId !== action.payload.recurrenceId,
          ),
        };
      } else {
        return {
          ...state,
          events: state.events.filter((ev) => ev.id !== action.payload.id),
        };
      }
    default:
      return state;
  }
};

export const CalendarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem("calendarEvents");
    if (stored) dispatch({ type: "INIT_EVENTS", payload: JSON.parse(stored) });
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(state.events));
  }, [state.events]);

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </CalendarContext.Provider>
  );
};
