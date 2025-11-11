from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from .schemas import LoginRequest, TokenResponse, Alert, CreateAlert, Resource, CreateResource, PredictionPoint, IngestPayload, User
from .auth import create_token, get_current_user
from . import data_store as store

app = FastAPI(title="AIDRP Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

# --- Auth ---
@app.post("/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest):
    user = store.USERS.get(payload.username)
    if not user or user["password"] != payload.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(payload.username, user["role"])
    return TokenResponse(access_token=token, role=user["role"], username=payload.username)

@app.get("/auth/me", response_model=User)
def me(current=Depends(get_current_user)):
    return User(username=current["username"], role=current["role"])

# --- Alerts ---
@app.get("/alerts", response_model=List[Alert])
def list_alerts(current=Depends(get_current_user)):
    return store.ALERTS

@app.post("/alerts", response_model=Alert)
def create_alert(payload: CreateAlert, current=Depends(get_current_user)):
    store.CURRENT_ID["alert"] += 1
    new = Alert(id=store.CURRENT_ID["alert"], **payload.model_dump())
    store.ALERTS.append(new)
    return new

@app.post("/alerts/{alert_id}/close", response_model=Alert)
def close_alert(alert_id: int, current=Depends(get_current_user)):
    for a in store.ALERTS:
        if a.id == alert_id:
            a.status = "closed"
            return a
    raise HTTPException(status_code=404, detail="Alert not found")

# --- Resources ---
@app.get("/resources", response_model=List[Resource])
def list_resources(current=Depends(get_current_user)):
    return store.RESOURCES

@app.post("/resources", response_model=Resource)
def create_resource(payload: CreateResource, current=Depends(get_current_user)):
    store.CURRENT_ID["resource"] += 1
    res = Resource(id=store.CURRENT_ID["resource"], **payload.model_dump())
    store.RESOURCES.append(res)
    return res

# --- Predictions (mock AI) ---
@app.get("/predictions", response_model=List[PredictionPoint])
def get_predictions(current=Depends(get_current_user)):
    return store.PREDICTIONS

# --- Ingestion (logs external data you send) ---
@app.post("/ingestion/upload")
def ingest(payload: IngestPayload, current=Depends(get_current_user)):
    store.INGEST_LOG.append({
        "user": current["username"],
        "source": payload.source,
        "notes": payload.notes,
        "data": payload.data,
    })
    return {"status": "accepted", "records": len(store.INGEST_LOG)}