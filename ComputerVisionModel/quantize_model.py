import nncf
import tensorflow_datasets as tfds
from model_dataset import validation
from pathlib import Path

# Instantiate your uncompressed model
model = disaster_detector
# Provide validation part of the dataset to collect statistics needed for the compression algorithm
val_dataset = tfds.load(Path(validation), split="validation",
                        shuffle_files=False, as_supervised=True)

# Step 1: Initialize transformation function
def transform_fn(data_item):
    images, _ = data_item
    return images

# Step 2: Initialize NNCF Dataset
calibration_dataset = nncf.Dataset(val_dataset, transform_fn)
# Step 3: Run the quantization pipeline
quantized_model = nncf.quantize(model, calibration_dataset)