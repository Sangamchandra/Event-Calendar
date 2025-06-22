import React, { useState, useContext, useEffect } from "react";
import { CalendarContext } from "../context/CalendarContext";

const EventFormModal = ({ event, onClose }) => {
  const isEdit = !!event?.id;
  const [form, setForm] = useState({
    title: "",
    start: "",
    end: "",
    desc: "",
    recurrence: "none",
    repeatInterval: 1,
    color: "#3174ad",
    category: "",
  });
  const { dispatch } = useContext(CalendarContext);

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || "",
        start: event.start ? formatLocalDateTime(event.start) : "",
        end: event.end ? formatLocalDateTime(event.end) : "",
        desc: event.desc || "",
        recurrence: event.recurrence || "none",
        repeatInterval: event.repeatInterval || 1,
        color: event.color || "#3174ad",
        category: event.category || "",
      });
    }
  }, [event]);

  const formatLocalDateTime = (date) => {
    const pad = (n) => (n < 10 ? "0" + n : n);
    const d = new Date(date);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate(),
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "repeatInterval" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventPayload = {
      ...event,
      title: form.title,
      start: new Date(form.start),
      end: new Date(form.end),
      desc: form.desc,
      recurrence: form.recurrence,
      repeatInterval: form.repeatInterval,
      color: form.color,
      category: form.category,
    };
    dispatch({
      type: isEdit ? "UPDATE_EVENT" : "ADD_EVENT",
      payload: eventPayload,
    });
    onClose();
  };

  const handleDelete = () => {
    if (event.recurrenceId) {
      const all = window.confirm("Delete all recurring events?");
      dispatch({
        type: "DELETE_EVENT",
        payload: all ? { recurrenceId: event.recurrenceId } : { id: event.id },
      });
    } else {
      dispatch({ type: "DELETE_EVENT", payload: { id: event.id } });
    }
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          required
        />
        <input
          name="start"
          type="datetime-local"
          value={form.start}
          onChange={handleChange}
          required
        />
        <input
          name="end"
          type="datetime-local"
          value={form.end}
          onChange={handleChange}
          required
        />
        <textarea
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Description"
        />
        <label>Recurrence:</label>
        <select
          name="recurrence"
          value={form.recurrence}
          onChange={handleChange}
        >
          <option value="none">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        {form.recurrence !== "none" && (
          <input
            type="number"
            name="repeatInterval"
            min="1"
            value={form.repeatInterval}
            onChange={handleChange}
            placeholder="Repeat Interval"
          />
        )}
        <label>Category:</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <label>Event Color:</label>
        <input
          type="color"
          name="color"
          value={form.color}
          onChange={handleChange}
        />
        <div className="modal-buttons">
          <button type="submit">{isEdit ? "Update" : "Add"} Event</button>
          {isEdit && (
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          )}
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventFormModal;
