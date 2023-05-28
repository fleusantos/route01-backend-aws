import requests
import geojson
import rasterio
import asyncio
import numpy as np
import math

from app.backend.utility.coordinates import Point, Segment, Grid, create_grid

# Define the area of interest as a bounding box
class WorldPopRequests:
    def __init__(self, key=None) -> None:
        if key is not None:
            self.api_key = key

    def form_geojson(self, grid:Grid):
        fc = geojson.FeatureCollection([chunk.get_feature() for chunk in grid.chunks])
        gjson = geojson.dumps(fc, sort_keys=True)
        return gjson

    def get_data(self):
        pass
        

async def _get_distance(point1, point2):
    x1, y1 = point1
    x2, y2 = point2

    distance = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    return distance


async def _calculate_average(cells, point:Point, resolution):
    result = 0
    for data, cords in cells.items():
        distance = await _get_distance(cords, [point.x, point.y])
        result += data * (distance / resolution) / 4 #TODO check if x and y not swapped places
    
    return result


async def load_from_file(grid:Grid):
    try:
        with rasterio.open("/pop_data_small.tif") as src:
            image = src.read(1)
            bounds = src.bounds
            resolution = (src.transform.a + src.transform.e) / 2
            step = (abs(bounds[2] - bounds[0])/np.shape(image)[1] + abs(bounds[3] - bounds[1])/np.shape(image)[0]) / 2

        for i in range(len(grid.chunks)):
            top_left_x = abs(grid.chunks[i].center.x - bounds[0])//step # top_left index
            top_left_y = abs(grid.chunks[i].center.y - bounds[3])//step # top_left index

            #TODO check if x and y not swapped places
            value = await _calculate_average({image[top_left_x, top_left_y]: [bounds[0] + top_left_x * step, bounds[3] + top_left_y * step],
                                   image[top_left_x + 1, top_left_y]: [bounds[0] + (top_left_x + 1) * step, bounds[3] + top_left_y * step], 
                                   image[top_left_x + 1, top_left_y + 1]: [bounds[0] + (top_left_x + 1) * step, bounds[3] + (top_left_y + 1) * step], 
                                   image[top_left_x, top_left_y + 1]: [bounds[0] + top_left_x * step, bounds[3] + (top_left_y + 1) * step]},
                                   grid.chunks[i].center, resolution)
            grid.chunks[i].data['pop_count_adj'] = value
    except FileNotFoundError as e:
        raise ValueError(f"Tif file was not found! Check path for errors.\n{e}")
    except Exception as e:
        raise Exception(f"Unknown error during loading from file!\n{e}")
