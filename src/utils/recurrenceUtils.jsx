export const expandRecurringEvents = (event) => {
  const { recurrence, repeatInterval = 1, recurrenceId } = event;
  if (!recurrence || recurrence === "none") return [event];

  const result = [event];
  const start = new Date(event.start);
  const end = new Date(event.end);
  for (let i = 1; i <= 30; i++) {
    let nextStart = new Date(start);
    let nextEnd = new Date(end);

    switch (recurrence) {
      case "daily":
        nextStart.setDate(start.getDate() + i * repeatInterval);
        nextEnd.setDate(end.getDate() + i * repeatInterval);
        break;
      case "weekly":
        nextStart.setDate(start.getDate() + i * 7 * repeatInterval);
        nextEnd.setDate(end.getDate() + i * 7 * repeatInterval);
        break;
      case "monthly":
        nextStart.setMonth(start.getMonth() + i * repeatInterval);
        nextEnd.setMonth(end.getMonth() + i * repeatInterval);
        break;
      default:
        return [event];
    }
    result.push({
      ...event,
      id: event.id + "-" + i,
      start: nextStart,
      end: nextEnd,
      recurrenceId,
    });
  }
  return result;
};
