# AIDRP Backend (No DB)

## Setup
cd backend
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt

## Run
uvicorn main:app --reload
# If inside a package ("from . ..."), run as module:
# uvicorn backend.main:app --reload --app-dir ..

Open http://127.0.0.1:8000/docs for Swagger.