import cv2
import matplotlib.pyplot as plt
import numpy as np
import time
from pathlib import Path
from openvino import Core


model_path = Path("computer_vision_model/model/ov_model/")
model = Path(f"{model_path}/model.xml")
weights = Path(f"{model_path}/model.bin")

quantized_model_path = Path("computer_vision_model/model/quantized_model/")
quantized_model = Path(f"{model_path}/model.xml")
quantized_weights = Path(f"{model_path}/model.bin")
print("Model located at {}".format(model_path))
print("Quantized model located at {}".format(quantized_model_path))

core = Core()
read_model = core.read_model(model=model, weights=weights)
compiled_model = core.compile_model(model=model, device_name="CPU")
read_quantized_model = core.read_model(model=quantized_model, weights=quantized_weights)
compiled_quantized_model = core.compile_model(model=quantized_model, device_name="CPU")

input_layer = compiled_model.input(0)
output_layer = compiled_model.output(0)

quantized_input_layer = compiled_quantized_model.input(0)
quantized_output_layer = compiled_quantized_model.output(0)
image = cv2.imread(filename="inference_test/test_computer_vision_model/images/image1.jpg")
# Resize image to network input image shape
resized_image = cv2.resize(src=image, dsize=(224, 224))

# Transpose image to network input shape
input_image = np.expand_dims(np.transpose(resized_image, (1, 0, 2)), 0)
plt.imshow(image)

result = compiled_model(inputs={input_layer: input_image})[output_layer]
quantized_result = compiled_quantized_model(inputs={quantized_input_layer: input_image})[quantized_output_layer]
result_index = np.argmax(result)
quantized_result_index = np.argmax(quantized_result)


# The model description states that for this model, class 0 is background,
# so we add background at the beginning of imagenet_classes
result_classes = ["Earthquake", "Drought",
           "Damaged Infrastructure", "Human Damage", "Human", "Land Slide", "Non Damage Buildings and  Street", "Non Damage Wildlife Forest",
           "Sea", "Urban Fire", "Wild Fire", "Water Disaster"]

print(f"The openvino model depicts {result_classes[result_index]}")
print(f"The openvino quantized model depicts {result_classes[quantized_result_index]}")


print("Calculating IR Model Benchmarks")
num_images = 1000
start = time.perf_counter()
for _ in range(num_images):
    compiled_model(inputs={input_layer: input_image})
end = time.perf_counter()
time_ir = end - start
print(
    f"IR model in Inference Engine/CPU: {time_ir/num_images:.4f} "
    f"seconds per image, FPS: {num_images/time_ir:.2f}"
)

print("Calculating IR Quantized Model Benchmarks")
num_images = 1000
start = time.perf_counter()
for _ in range(num_images):
    compiled_quantized_model(inputs={quantized_input_layer: input_image})
end = time.perf_counter()
time_ir = end - start
print(
    f"IR quantized model in Inference Engine/CPU: {time_ir/num_images:.4f} "
    f"seconds per image, FPS: {num_images/time_ir:.2f}"
)