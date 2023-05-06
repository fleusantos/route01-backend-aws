import requests
import geojson
import aiohttp
import asyncio

from backend.utility.coordinates import Point, Segment, Grid


class GeocodioRequests:

    def __init__(self) -> None:
        pass

    def create_grid(self, seg:Segment, res_m=1000):
        res = res_m/1000/111.11
        grid = Grid(seg)
        grid.split_by_res(res)

        return grid

    async def get_data(self, grid:Grid):
        centers = grid.get_centers()
        res = [] 

        async with aiohttp.ClientSession() as session:
            for p in centers:
                pass
        


