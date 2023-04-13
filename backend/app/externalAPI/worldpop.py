import requests
import geojson

from backend.utility.coordinates import Point, Segment, Grid

# Define the area of interest as a bounding box
class WorldPopRequests:
    def __init__(self, key=None) -> None:
        if key is not None:
            self.api_key = key

    def create_grid(self, seg:Segment, res_m=100):
        res = res_m/1000/111
        grid = Grid(seg)
        grid.split_by_res(res)

        return grid

    def form_geojson(self, grid:Grid):
        fc = geojson.FeatureCollection([chunk.get_feature() for chunk in grid.chunks])
        gjson = geojson.dumps(fc, sort_keys=True)
        # add here maker for featurecollection
        return gjson

    def get_data(self, ):
        pass
        


