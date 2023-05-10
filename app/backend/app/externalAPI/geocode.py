import requests
import geojson
import aiohttp
import asyncio
from geocodio import GeocodioClient

from app.backend.utility.coordinates import Point, Segment, Grid


class GeocodioRequests:
    key = "65b76561d765db5fd62522424dd5d443644f7fb"
    def __init__(self) -> None:
        self.client = GeocodioClient(GeocodioRequests.key)

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
