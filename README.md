# Computer Vision Model for Climate wavers

## Overview

This computer vision model is an integral part of our AI-driven disaster response application. The model has been fine-tuned using TensorFlow based on the ResNet architecture. To optimize performance and resource usage, the model has been converted to the OpenVINO Intermediate Representation (IR) format and quantized.

## Model Architecture

- **Base Architecture:** ResNet
- **Framework:** TensorFlow
- **Optimization:** Converted to OpenVINO IR and quantized for efficient deployment.

## Model Training

The model has undergone a comprehensive training process using a dataset relevant to disaster scenarios. Fine-tuning was performed on top of the pre-trained ResNet model, leveraging transfer learning to adapt the model to our specific use case.

## Model Conversion

To enable deployment on the OpenVINO model server, the TensorFlow model was converted to the OpenVINO Intermediate Representation (IR) format. This conversion facilitates efficient execution on a variety of hardware platforms supported by OpenVINO.

## Quantization

Quantization was applied to reduce the precision of the model's weights, leading to a more lightweight model. This optimization is crucial for deploying the model on edge devices and in scenarios with resource constraints.

## Deployment

The model is deployed using the OpenVINO model server, which provides an efficient and scalable solution for serving computer vision models. The server is capable of handling inference requests, making it suitable for real-time disaster response applications. 
To deploy the model with model server we will be using the scripts provided in `automate_development` to deploy a pvc and a temp pod to store our models on the pvc. To use the scripts, docker and oc must be installed. Ensure that the openvino toolkit operator is installed on openshift console

### Build and push image
You can replace the image repository in the scripts `build.sh` in `automate_deployment` or use the repository we provided.
  ```bash
   automate_deployment/./build.sh
   ```
### Deploy Pod, Persistent Volume Claim and Model Server
If the image repository was changed when building, update the `development.yaml` file in `k8s` folder with your image repository. The scripts deploy a pvc and pod, and bound pod to pvc, copying the models to the pvc and delete the temp pod. Lastly, it deploys model server mounting the pvc
  ```bash
   automate_deployment/./deploy.sh
   ```
 

## Dependencies

- TensorFlow
- OpenVINO Toolkit
- OpenVINO Python API

Refer to the documentation of TensorFlow and OpenVINO for installation instructions and additional details.

## License

This computer vision model is provided under the [license](link/to/license) specified for your use. Please review the license before integrating or modifying the model in your application.

