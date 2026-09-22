from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from stag import get_schedule, get_schedule_events

app = FastAPI(
    title="UTB Scheduler",
    version="0.1.0"
    
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def root():
    return {
        "name": "UTB Scheduler",
        "status": "running"
    }


@app.get("/schedule")
def schedule():
    return get_schedule()


@app.get("/events")
def events():
    return get_schedule_events()