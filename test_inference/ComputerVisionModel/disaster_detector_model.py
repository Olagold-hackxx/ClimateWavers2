import cv2
import matplotlib.pyplot as plt
import numpy as np
import time
from pathlib import Path
from openvino.inference_engine import IECore
from ComputerVisionModel import model

ir_path = Path(model)
print("Model located at {}".format(ir_path))
ie = IECore()
net = ie.read_network(model=ir_path, weights=ir_path.with_suffix(".bin"))
exec_net = ie.load_network(network=net, device_name="CPU")

input_key = list(exec_net.input_info)[0]
output_key = list(exec_net.outputs.keys())[0]
network_input_shape = exec_net.input_info[input_key].tensor_desc.dim

#The MobileNet network expects images in RGB format
image = cv2.cvtColor(cv2.imread(filename="test_dataset/coco.jpg"), code=cv2.COLOR_BGR2RGB)

# Resize image to network input image shape
resized_image = cv2.resize(src=image, dsize=(224, 224))

# Transpose image to network input shape
input_image = np.reshape(resized_image, network_input_shape) / 255
input_image = np.expand_dims(np.transpose(resized_image, (2, 0, 1)), 0)
plt.imshow(image)

result = exec_net.infer(inputs={input_key: input_image})[output_key]
result_index = np.argmax(result)

# Convert the inference result to a class name.
imagenet_classes = open("utils/imagenet_2012.txt").read().splitlines()

# The model description states that for this model, class 0 is background,
# so we add background at the beginning of imagenet_classes
imagenet_classes = ['background'] + imagenet_classes

imagenet_classes[result_index]


num_images = 1000
start = time.perf_counter()
for _ in range(num_images):
    exec_net.infer(inputs={input_key: input_image})
end = time.perf_counter()
time_ir = end - start
print(
    f"IR model in Inference Engine/CPU: {time_ir/num_images:.4f} "
    f"seconds per image, FPS: {num_images/time_ir:.2f}"
)