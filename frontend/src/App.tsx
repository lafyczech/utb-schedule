import { useEffect, useState } from "react";

type Event = {
  id: number;
  subject: string;
  title: string;
  teacher: string;
  room: string;
  day: string;
  start: string;
  end: string;
  cancelled: string | null;
};

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>UTB Scheduler</h1>

      {events.map((event) => (
        <div
          key={event.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{event.title}</h3>

          <p>
            <strong>Předmět:</strong> {event.subject}
          </p>

          <p>
            <strong>Den:</strong> {event.day}
          </p>

          <p>
            <strong>Čas:</strong> {event.start} - {event.end}
          </p>

          <p>
            <strong>Místnost:</strong> {event.room}
          </p>

          <p>
            <strong>Vyučující:</strong> {event.teacher}
          </p>

          {event.cancelled && (
            <p style={{ color: "red" }}>
              ⚠️ {event.cancelled}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;