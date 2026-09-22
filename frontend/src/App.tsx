import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

type Event = {
  id: number;
  title: string;
  day: string;
  start: string;
  end: string;
};

const dayMap: Record<string, number> = {
  "Pondělí": 1,
  "Úterý": 2,
  "Středa": 3,
  "Čtvrtek": 4,
  "Pátek": 5,
};

function App() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/events")
      .then((res) => res.json())
      .then((data) => {
        const calendarEvents = data.map((item: Event) => ({
          id: item.id,
          title: item.title,
          daysOfWeek: [dayMap[item.day]],
          startTime: item.start,
          endTime: item.end,
        }));

        setEvents(calendarEvents);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>UTB Scheduler</h1>

      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        weekends={false}
        allDaySlot={false}
        events={events}
        slotMinTime="07:00:00"
        slotMaxTime="20:00:00"
        height="auto"
      />
    </div>
  );
}

export default App;