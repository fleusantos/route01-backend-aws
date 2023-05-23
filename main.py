import motor.motor_asyncio
import uvicorn
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI, APIRouter
from app.backend.app.externalAPI import WorldPopRequests
from app.backend.utility.coordinates import Point, Segment, create_grid
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
    wpr = WorldPopRequests()
    grid = create_grid(Segment([Point(41.2, -74.5), Point(41.2, -72.7),
                            Point(40.2, -74.5), Point(40.2, -72.7)]))
    # return wpr.form_geojson(grid)
    return len(grid.chunks)


app.include_router(router)


if __name__ == "__main__":
    uvicorn.run(app, host='127.0.0.1', port=8000)
