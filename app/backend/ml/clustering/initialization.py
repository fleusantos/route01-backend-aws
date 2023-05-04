import rasterio
import numpy as np
from sklearn.cluster import DBSCAN, OPTICS
from tqdm import tqdm

CHUNK_SIZE = 36000*2

with rasterio.open('C:/Users/User/PycharmProjects/SafeRoute/cropped_test_file.tif') as src:
    image = src.read()

pixels = image.reshape(image.shape[0], -1).T

# Create a progress bar for DBSCAN clustering
dbscan_progress = tqdm(desc="OPTICS clustering", total=pixels.shape[0])

# Perform DBSCAN clustering on the pixel values
dbscan = OPTICS(eps=0.005, min_samples=50).fit(pixels)
dbscan_progress.update(pixels.shape[0])

# Reshape the labels to match the original image shape
labels = dbscan.labels_.reshape(image.shape[1], image.shape[2])

# # Reshape the array to a 2D matrix where each row represents a pixel
# pixels = image.reshape(image.shape[0], -1).T

# # Split the pixel data into chunks
# pixel_chunks = [pixels[i:i+CHUNK_SIZE] for i in range(0, pixels.shape[0], CHUNK_SIZE)]

# # Create a progress bar for DBSCAN clustering
# dbscan_progress = tqdm(desc="DBSCAN clustering", total=pixels.shape[0])

# # Initialize an empty labels array
# labels = np.empty(pixels.shape[0], dtype=int)

# # Perform DBSCAN clustering on each chunk of pixels
# for i, chunk in enumerate(pixel_chunks):
#     dbscan = OPTICS(eps=0.001, min_samples=50).fit(chunk)
#     labels[i*CHUNK_SIZE:(i+1)*CHUNK_SIZE] = dbscan.labels_
#     dbscan_progress.update(chunk.shape[0])

# # Reshape the labels to match the original image shape
# labels = labels.reshape((image.shape[1], image.shape[2]))

# Write the clustered image to a new TIF file using Rasterio
with rasterio.open('clustered.tif', 'w', driver='GTiff', width=image.shape[2], height=image.shape[1], count=1, dtype=labels.dtype, crs=src.crs, transform=src.transform) as dst:
    dst.write(labels, 1)
