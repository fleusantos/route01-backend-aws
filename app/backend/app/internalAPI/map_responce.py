import requests
import geojson
import aiohttp
import asyncio
import tensorflow as tf
from pandas import DataFrame

from app.backend.utility.coordinates import Point, Segment, Grid

class mapResponce:
    def __init__(self, model_path="../../ml/model/model.h5") -> None:
        self._model = self.__load_model(model_path)


    def __load_model(self, path) -> tf.saved_model:
        model = tf.saved_model.load(path)
        return model
    
    def predict_from_data(self, input_data:dict) -> list:
        try:
            if set(input_data.keys()) != ('pop_count_adj', 'income'):
                raise ValueError(f"Incorrect keys for input_data({input_data.keys()}), should be 'pop_count_adj', 'income'")   
            values = DataFrame(input_data, index=[0])
            res = []
            for k, v in values.items():
                res.append(self._model.predict(values))
            return res
        
        except Exception as e:
            raise ValueError(f"Prediction error: \n{e}")
