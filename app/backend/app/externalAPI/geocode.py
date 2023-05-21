import requests
import geojson
import aiohttp
import asyncio
from geocodio import GeocodioClient

from dotenv import load_dotenv
import os

from app.backend.utility.coordinates import Point, Segment, Grid


class GeocodioRequests:
    def __init__(self) -> None:
        self.__key = self.__load_key()
        self.client = GeocodioClient(self.__key)

    def __load_key(self) -> str:
        load_dotenv()
        return os.getenv("GEOCODE_API_KEY")


    # def create_grid(self, seg:Segment, res_m=1000):
    #     res = res_m/1000/111.11
    #     grid = Grid(seg)
    #     grid.split_by_res(res)

    #     return grid

    # async def get_data(self, grid:Grid):
    #     centers = grid.get_centers()
    #     res = [] 

    #     async with aiohttp.ClientSession() as session:
    #         for p in centers:
    #             pass
        


if __name__ == "__main__":
    gr = GeocodioRequests()
    address_sets = gr.client.reverse([
        (35.9746000, -77.9658000)], fields = ["acs-economics"])
    
    print(address_sets)
