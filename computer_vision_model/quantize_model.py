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

# Define a function to resize and normalize the images
def preprocess_image(images):
    # Resize the image to the desired shape (e.g., (224, 224))
     # Ensure the image is a TensorFlow float32 tensor
    image = images["image"]
    label = images["label"]
    image = tf.image.resize(image, (224, 224))  # Change the dimensions accordingly
    # Normalize pixel values to the range [0, 1]
    image = image / 255.0
    image = tf.expand_dims(image, axis=0)  # Adds a new input channel at the last axis
    label = tf.expand_dims(label, axis=0)  # Adds a new input channel at the last axis
    dataset = {"image": image, "label": label}
    return dataset

val_loader = tfds.load("caltech101", split="test")
val_loader = val_loader.map(preprocess_image)
# Provide validation part of the dataset to collect statistics needed for the compression algorithm
# Step 1: Initialize transformation function
def transform_fn(data_item):
    images = data_item["image"]
    print(images)
    return images

calibration_dataset = nncf.Dataset(val_loader, transform_fn)
validation_dataset = nncf.Dataset(val_loader, transform_fn)

def validate(model: openvino.runtime.CompiledModel,
             validation_loader) -> float:
    predictions = []
    references = []

    output = model.outputs[0]

    for images in validation_loader:
        pred = model(images["image"])[output]
        predictions.append(np.argmax(pred, axis=1))
        references.append(images["label"])
        print(pred)

    predictions = np.concatenate(predictions, axis=0)
    references = np.concatenate(references, axis=0)
    print("[INFO] Validation complete")
    return accuracy_score(predictions, references)



print("[INFO] Quantizing model")
quantized_model = nncf.quantize_with_accuracy_control(model,
                        calibration_dataset=calibration_dataset,
                        validation_dataset=validation_dataset,
                        validation_fn=validate,
                        max_drop=0.01)
print(quantized_model)
print("[INFO] Saving quantized model")
openvino.serialize(quantized_model, "model/quantized model/quantized_model.xml")

