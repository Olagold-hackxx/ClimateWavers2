from pathlib import Path
from openvino import convert_model
import tensorflow as tf

model = tf.keras.models.load_model('model/disaster_detector.h5')
# The paths of the source and converted models

ov_model = convert_model(input_model=model,
                         input=[1,224,224,3])
