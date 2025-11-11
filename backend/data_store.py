from typing import List
from .schemas import Alert, Resource, PredictionPoint, User

# In‑memory stores (reset on restart)
ALERTS: List[Alert] = [
    Alert(id=1, type="Flood", severity="high", message="River overflow near Sector 7",
          lat=17.3850, lng=78.4867),
    Alert(id=2, type="Cyclone", severity="medium", message="High winds expected",
          lat=16.5062, lng=80.6480)
]

RESOURCES: List[Resource] = [
    Resource(id=1, name="Rescue Team A", category="human", available=10, in_use=4),
    Resource(id=2, name="Ambulances", category="vehicle", available=6, in_use=2),
    Resource(id=3, name="Relief Kits", category="supply", available=500, in_use=180),
]

PREDICTIONS: List[PredictionPoint] = [
    PredictionPoint(id=1, lat=17.40, lng=78.50, risk=0.82, label="High Flood Risk"),
    PredictionPoint(id=2, lat=16.52, lng=80.64, risk=0.61, label="Moderate Wind Risk"),
    PredictionPoint(id=3, lat=13.08, lng=80.27, risk=0.44, label="Coastal Surge")
]

USERS = {
    # username: {password, role}
    "admin": {"password": "Admin@2025", "role": "Admin"},
    "responder": {"password": "resp123", "role": "Responder"},
    "analyst": {"password": "analyst123", "role": "Analyst"},
}

CURRENT_ID = {"alert": len(ALERTS), "resource": len(RESOURCES)}

# Simple audit log in memory
INGEST_LOG: list[dict] = []