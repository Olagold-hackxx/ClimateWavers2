from pathlib import Path
from openvino import convert_model
import tensorflow as tf

loaded_model = tf.saved_model.load("model/disaster_detector")

# The paths of the source and converted models

ov_model = convert_model(input_model=loaded_model,
                         input=[1,224,224,3])
