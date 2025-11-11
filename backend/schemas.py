from pydantic import BaseModel, Field
from typing import List, Optional

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    username: str

class Alert(BaseModel):
    id: int
    type: str
    severity: str
    message: str
    lat: float
    lng: float
    status: str = Field(default="open")

class CreateAlert(BaseModel):
    type: str
    severity: str
    message: str
    lat: float
    lng: float

class Resource(BaseModel):
    id: int
    name: str
    category: str
    available: int
    in_use: int

class CreateResource(BaseModel):
    name: str
    category: str
    available: int
    in_use: int

class PredictionPoint(BaseModel):
    id: int
    lat: float
    lng: float
    risk: float  # 0..1
    label: str

class IngestPayload(BaseModel):
    source: str
    notes: Optional[str] = None
    data: dict

class User(BaseModel):
    username: str
    role: str