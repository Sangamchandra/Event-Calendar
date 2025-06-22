// DnDCalendar.jsx
import React from "react";
import moment from "moment";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const DnDCalendar = ({
  events,
  onEventDrop,
  onSelectEvent,
  onSelectSlot,
  onView,
  view,
  eventPropGetter,
}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        resizable
        onEventDrop={onEventDrop}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        onView={onView}
        view={view}
        views={["month", "week", "day", "agenda"]}
        eventPropGetter={eventPropGetter}
        style={{ height: 600 }}
        draggableAccessor={() => true}
      />
    </DndProvider>
  );
};

export default DnDCalendar;
