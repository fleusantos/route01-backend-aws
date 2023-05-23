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
    

class Segment:
    def __init__(self, points = [Point]) -> None:
        self.points = points
        self.center = self.get_center()
        self.population = 0
        self.income = 0

    def __get_center(self):
        min_x = min([p.x for p in self.points])
        max_x = max([p.x for p in self.points])
        min_y = min([p.y for p in self.points])
        max_y = max([p.y for p in self.points])
        
        return Point((min_x + max_x)/2, (min_y + max_y)/2)

    def get(self):
        return self.points
    
    def get_raw(self):
        return [pnt.get() for pnt in self.points]

    def get_polygon(self):
        return geojson.Polygon(self.get_raw())
    
    def get_feature(self):
        return geojson.Feature(geometry=self.get_polygon())
    

class Grid:
    def __init__(self, seg:Segment) -> None:
        self.points = seg.points
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

                chunks.append(chunk)

        self.chunks = chunks
        return chunks

    def get_centers(self):
        centers = [c.center for c in self.chunks]
        return centers

