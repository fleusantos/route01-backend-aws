import motor.motor_asyncio
import uvicorn
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI, APIRouter
from backend.externalAPI import get_data
from time import sleep
from envparse import Env

env = Env()

app = FastAPI()

router = APIRouter()

@router.get("/")
async def mainpage():
    return "Hello world"

@router.get("/ping")
async def ping():
    return {"Success": True}

@router.get("/worldpop")
async def worldpop_test():
    return get_data()


app.include_router(router)


if __name__ == "__main__":
    uvicorn.run(app, host='127.0.0.1', port=8000)
