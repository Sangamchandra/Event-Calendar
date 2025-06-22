# Event Calendar

A responsive, dark-mode-supported event calendar built with React and React Big Calendar. It supports:

- Adding, editing, and deleting events
- Recurring events (daily, weekly, monthly, custom)
- Drag-and-drop rescheduling
- Event category filtering and search
- Conflict detection and warning
- Mobile responsiveness and dark/light theme toggle

---

## Demo

[Live Demo on Render](#) _(Add URL after deployment)_

---

## Tech Stack

- React
- React Big Calendar
- date-fns
- React Context API (for global state)
- Custom CSS for styling and theming

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/event-calendar.git
cd event-calendar
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App Locally

```bash
npm start
```

The app will start on `http://localhost:3000`.

---

## Theme Toggle

Use the toggle button on the top-right to switch between light and dark modes. Your preference will be saved locally.

---

## Build for Production

```bash
npm run build
```

You can deploy the `build` folder on platforms like Render, Netlify, or Vercel.

---

## Features

- Monthly & Weekly View
- Click-to-add Event
- Recurrence Options: Daily, Weekly, Monthly, Custom
- Drag and Drop to Reschedule
- Edit/Delete Events
- Category Tagging & Filtering
- Search Bar
- Conflict Detection (same date/time)
- LocalStorage Persistence
- Fully Responsive

---

## Folder Structure

```
/src
├── components/
│   ├── CalendarView.jsx
│   ├── DnDCalendar.jsx
│   └── EventFormModal.jsx
├── context/
│   └── CalendarContext.js
├── App.jsx
├── index.js
└── styles.css
```

---

## Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License

MIT License © 2025 Sangam Chandra
