from firebase_functions import https_fn
from firebase_admin import initialize_app
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

initialize_app()

app = FastAPI()

# Add CORS middleware to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pydantic import BaseModel
from datetime import datetime

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str

@app.get("/api/system-status")
def get_system_status():
    return {
        "status": "Operational",
        "throughput": "8,492 ops/s",
        "active_nodes": ["Python", "Snowflake", "Databricks"]
    }

@app.post("/api/contact")
def contact(msg: ContactMessage):
    print(f"Received contact from {msg.name} ({msg.email}): {msg.subject} - {msg.message}")
    return {"status": "delivered", "timestamp": datetime.now().isoformat()}

@https_fn.on_request()
def api(req: https_fn.Request) -> https_fn.Response:
    # Note: FastAPI is ASGI, while Firebase expects WSGI.
    # To fully bridge them in production, you will need an ASGI-to-WSGI adapter.
    pass
