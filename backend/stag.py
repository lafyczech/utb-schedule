import os
import requests
from dotenv import load_dotenv

load_dotenv()

USERNAME = os.getenv("STAG_USERNAME")
PASSWORD = os.getenv("STAG_PASSWORD")
OS_CISLO = os.getenv("STAG_OS_CISLO")


def get_schedule():
    url = (
        "https://stag-ws.utb.cz/ws/services/rest2/rozvrhy/"
        f"getRozvrhByStudent?osCislo={OS_CISLO}&outputFormat=JSON"
    )

    response = requests.get(
        url,
        auth=(USERNAME, PASSWORD),
        timeout=30
    )

    response.raise_for_status()

    return response.json()


def get_schedule_events():
    data = get_schedule()
    events = []

    # Opravený překlep: odstraněno zpětné lomítko a přidáno .get() pro bezpečnost
    for item in data.get("rozvrhovaAkce", []):
        
        # Bezpečné získání času zanořeného ve slovníku
        start_time = item.get("hodinaSkutOd", {}).get("value", "")
        end_time = item.get("hodinaSkutDo", {}).get("value", "")
        
        events.append({
            "id": item.get("roakIdno"),
            "subject": item.get("predmet"),
            "title": item.get("nazev"),
            "teacher": item.get("vsichniUcitelePrijmeni"),
            "room": f'{item.get("budova", "")}/{item.get("mistnost", "")}',
            "day": item.get("den"),
            "start": start_time,
            "end": end_time,
            "cancelled": item.get("nekonaSe", False)
        })

    return events