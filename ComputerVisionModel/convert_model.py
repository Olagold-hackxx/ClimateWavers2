from openvino import convert_model
import openvino
import tensorflow as tf

loaded_model =  tf.keras.models.load_model('model/disaster_detector.h5')

# The paths of the source and converted models

ov_model = convert_model(loaded_model)
# save model to OpenVINO IR for later use
openvino.save_model(ov_model, 'model/ov model/model.xml')
