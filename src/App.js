import React, { useEffect, useState } from "react";
import CalendarView from "./components/CalendarView";
import { CalendarProvider } from "./context/CalendarContext";
import "./styles.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleButtonStyle = {
    padding: "10px 18px",
    borderRadius: "8px",
    backgroundColor: darkMode ? "#444" : "#f0f0f0",
    color: darkMode ? "#f0f0f0" : "#333",
    border: "1px solid",
    borderColor: darkMode ? "#666" : "#ccc",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
    boxShadow: darkMode
      ? "0 2px 6px rgba(0, 0, 0, 0.3)"
      : "0 2px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <CalendarProvider>
      <div className="App">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h2 style={{ margin: 0 }}>📅 Event Calendar</h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={toggleButtonStyle}
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
        <CalendarView />
      </div>
    </CalendarProvider>
  );
};

export default App;
