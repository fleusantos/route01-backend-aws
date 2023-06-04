import requests
import geojson
import aiohttp
import asyncio
from geocodio import GeocodioClient
import time

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
    
    async def __fetch_data(self, session:aiohttp.ClientSession, url:str, params:dict, chunk:Segment):
        async with session.get(url, params=params) as response:
            result = await response.json()
            if self.request_count % 900 == 0:
                await asyncio.sleep(70)
            try:
                if result.get('results'):
                    # check is for keyerror due to bad data.(value if exists else 0)
                    income_list = [result['results'][i]['fields']['acs']['economics']['Median household income']['Total']['value']
                                if result['results'][i]['fields']['acs']['economics']['Median household income'].get('Total', 0)
                                else 0 for i in range(len(result['results']))]
                    income = sum(list(filter(lambda x: x != 0, income_list))) / len(income_list)
                    chunk.data['income'] = income
            except aiohttp.ContentTypeError as e:
                raise Exception(f"{result}\n{e}")
            except KeyError as e:
                chunk.data['income'] = -1        
        
        self.request_count += 1

    # Оновлений метод `reverse_geocode_async`
    async def reverse_geocode_async(self, grid:Grid):
        url = "https://api.geocod.io/v1.7/reverse"
        self.request_count = 1  # Лічильник запитів

        async with aiohttp.ClientSession() as session:
            tasks = []
            for chunk in grid.chunks:
                params = {
                    "q": f"{chunk.center.y},{chunk.center.x}",
                    "fields": "acs-economics",
                    "api_key": self.__key
                }
                task = asyncio.create_task(self.__fetch_data(session, url, params, chunk))
                tasks.append(task)

            await asyncio.gather(*tasks)

        return grid
