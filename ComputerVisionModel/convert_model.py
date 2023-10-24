from openvino import convert_model
import tensorflow as tf
import openvino as ov

model = tf.keras.models.load_model('model/disaster_detector.h5')
# The paths of the source and converted models

ov_model = convert_model(model)


# save model to OpenVINO IR for later use
ov.save_model(ov_model, 'model/model.xml')

