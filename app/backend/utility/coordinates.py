import geojson


class Point:
    def __init__(self, x, y) -> None:
        """
        x: Longitude
        y: Latitude
        """
        self.x = x
        self.y = y

    def get(self):
        return (self.x, self.y)
    
    def __str__(self) -> str:
        return f"Point x:{self.x} y:{self.y}"
    
    def __hash__(self) -> int:
        return hash(self.x, self.y)
    

class Segment:
    # TODO: implement __hash__ and __eq__ functions (for why googele can class instance be used as a key?)
    def __init__(self, points = [Point]) -> None:
        self.points = points
        self.center = self.get_center()
        self.data = {'pop_count_adj': -1, 'income': -1, 'crime_level': -1}

    def __get_center(self):
        min_x = min([p.x for p in self.points])
        max_x = max([p.x for p in self.points])
        min_y = min([p.y for p in self.points])
        max_y = max([p.y for p in self.points])
        
        return Point((min_x + max_x)/2, (min_y + max_y)/2)
    
    def point_in_segment(self, point) -> bool:
        polygon = self.get_polygon()
        point_coords = (point.x, point.y)
        
        return polygon.contains(geojson.Point(point_coords))

    def get(self):
        return self.points
    
    def get_raw(self):
        return [pnt.get() for pnt in self.points]

    def get_polygon(self):
        return geojson.Polygon(self.get_raw())
    
    def get_feature(self):
        return geojson.Feature(geometry=self.get_polygon())
    
    def __hash__(self) -> int:
        return self.center.__hash__()
    

class Grid:
    def __init__(self, seg:Segment) -> None:
        self.points = seg.points
        self.seg = seg
        self.resolution = 0
        self.chunks = []

    def split_by_res(self, resolution):
        self.resolution = resolution

        min_x = min([p.x for p in self.points])
        max_x = max([p.x for p in self.points])
        min_y = min([p.y for p in self.points])
        max_y = max([p.y for p in self.points])

        num_chunks_x = int((max_x - min_x) / resolution)
        num_chunks_y = int((max_y - min_y) / resolution)

        chunks = []
        for i in range(num_chunks_x):
            for j in range(num_chunks_y):
                chunk_min_x = min_x + i * resolution
                chunk_max_x = chunk_min_x + resolution
                chunk_min_y = min_y + j * resolution
                chunk_max_y = chunk_min_y + resolution

                chunk = Segment([Point(chunk_min_x, chunk_min_y), Point(chunk_max_x, chunk_min_y), 
                         Point(chunk_max_x, chunk_max_y), Point(chunk_min_x, chunk_max_y)])
                
                if self.seg.point_in_segment(chunk.center):
                    chunks.append(chunk)

        self.chunks = chunks
        return chunks

    def get_centers(self):
        centers = [c.center for c in self.chunks]
        return centers


def create_grid(self, seg:Segment, res_m=1000):
    res = res_m/1000/111
    grid = Grid(seg)
    grid.split_by_res(res)

    return grid