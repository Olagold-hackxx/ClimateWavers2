import cv2
import matplotlib.pyplot as plt
import numpy as np
import time
from pathlib import Path
from openvino import Core


model_path = Path("computer_vision_model/model/ov model/")
model = Path(f"{model_path}/model.xml")
weights = Path(f"{model_path}/model.bin")
print("Model located at {}".format(model_path))
core = Core()
read_model = core.read_model(model=model, weights=weights)
compiled_model = core.compile_model(model=model, device_name="CPU")

input_layer = compiled_model.input(0)
output_layer = compiled_model.output(0)

image = cv2.imread(filename="inference_test/test_computer_vision_model/images/image1.jpg")
# Resize image to network input image shape
resized_image = cv2.resize(src=image, dsize=(224, 224))

# Transpose image to network input shape
input_image = np.expand_dims(np.transpose(resized_image, (1, 0, 2)), 0)
plt.imshow(image)

result = compiled_model(inputs={input_layer: input_image})[output_layer]
result_index = np.argmax(result)


# The model description states that for this model, class 0 is background,
# so we add background at the beginning of imagenet_classes
result_classes = ["Earthquake", "Drought",
           "Damaged Infrastructure", "Human Damage", "Human", "Land Slide", "Non Damage Buildings and  Street", "Non Damage Wildlife Forest",
           "Sea", "Urban Fire", "Wild Fire", "Water Disaster"]

result_classes[result_index]


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