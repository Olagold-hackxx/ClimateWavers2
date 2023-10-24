import numpy as np
import openvino
from sklearn.metrics import accuracy_score
import nncf
import tensorflow as tf
import os
import tensorflow_datasets as tfds
from openvino.runtime import Core
from imutils import paths
from model_config import config

# Initialize the Inference Engine Core
ie = Core()

# Path to the XML file of the IR model (architecture)
xml_file = 'model/ov model/model.xml'

# Path to the bin file of the IR model (weights)
bin_file = 'model/ov model/model.bin'

# Load the IR model
model = ie.read_model(model=xml_file, weights=bin_file)

val_loader = tfds.load("imagenet_a", download=False, data_dir="/home/olagold-hackxx/tensorflow_datasets/downloads/imagenet-a")
# Provide validation part of the dataset to collect statistics needed for the compression algorithm
# Step 1: Initialize transformation function
def transform_fn(data_item):
    images, _ = data_item
    return images

print(val_loader)
calibration_dataset = nncf.Dataset(val_loader, transform_fn)
validation_dataset = nncf.Dataset(val_loader, transform_fn)

def validate(model: openvino.runtime.CompiledModel,
             validation_loader) -> float:
    predictions = []
    references = []

    output = model.outputs[0]

    for images, target in validation_loader:
        pred = model(images)[output]
        predictions.append(np.argmax(pred, axis=1))
        references.append(target)

    predictions = np.concatenate(predictions, axis=0)
    references = np.concatenate(references, axis=0)
    return accuracy_score(predictions, references)


print("[INFO] Quantizing model")
quantized_model = nncf.quantize_with_accuracy_control(model,
                        calibration_dataset=calibration_dataset,
                        validation_dataset=validation_dataset,
                        validation_fn=validate,
                        max_drop=0.01)

print("[INFO] Saving quantized model")
openvino.save_model(quantized_model, "model/quantized model/quantized_model.xml")
