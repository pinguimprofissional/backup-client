
from fastapi import FastAPI
import json, os, datetime

app = FastAPI()

HISTORY_FILE = "backup_history.json"

def load_history():
    if not os.path.exists(HISTORY_FILE):
        return []
    with open(HISTORY_FILE, "r") as f:
        return json.load(f)

def save_history(history):
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2)

@app.get("/api/health")
def health():
    return {"msg": "Backend online!"}

@app.post("/api/backup")
def backup():
    now = datetime.datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    history = load_history()
    history.append({"action": "backup", "status": "success", "time": now})
    save_history(history)
    return {"msg": "Backup executado!", "time": now}

@app.post("/api/restore")
def restore():
    now = datetime.datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    history = load_history()
    history.append({"action": "restore", "status": "success", "time": now})
    save_history(history)
    return {"msg": "Restauração executada!", "time": now}

@app.get("/api/history")
def history():
    return load_history()
