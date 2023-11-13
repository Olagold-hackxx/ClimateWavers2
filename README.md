# WaverX-Analysis Microservice for Climate Wavers

## Overview

The `WaverX-Analysis` microservice is a crucial component of the Climate Wavers disaster response application. It is dedicated to analyzing disaster magnitude using climate data from past disasters. The model, known as WaverX-Analysis, pulls data from a climate data services provider to run inferences on specified dates. Built on the OpenShift Data Science platform and utilizing the Intel oneAPI toolkit, the microservice is served with Flask. The model focuses on analyzing the magnitude of Storms, Floods, and Earthquakes due to the availability of sufficient data in these categories. The model is constructed using scikit-learn with a random forest classifier and further optimized with the Intel scikit-learn extension.

## Features

- **Magnitude Analysis:** Analyzes disaster magnitude using climate data from past disasters.
- **Supported Disasters:** Specifically analyzes Storms, Floods, and Earthquakes due to data availability.
- **Data Pulling:** Pulls data from a climate data services provider for real-time analysis.
- **Intel Optimization:** The model is optimized using the Intel oneAPI toolkit and scikit-learn extension for enhanced performance.
- **Flask API:** Served through a Flask API for seamless integration with other microservices.

## Technologies Used

- Scikit-learn
- Random Forest Classifier
- Intel oneAPI Toolkit
- Intel scikit-learn Extension
- Flask
- OpenShift Data Science

## Setup

### Prerequisites

- Python installed
- Scikit-learn installed
- Intel oneAPI toolkit installed
- Flask installed

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Configure environment variables:

   - Set up necessary configurations for the data provider and Flask API.

4. Start the microservice:

```bash
python app.py
```

## Usage

Describe how users can interact with the microservice, including API endpoints, request and response formats, and any other relevant details.

## Model Training

Include information on how the WaverX-Analysis model was trained, highlighting the scikit-learn random forest classifier and Intel scikit-learn extension.

## Deployment
We provide three different methods for deploying this microservice to openshift clusters.
### Import Git Repositoy (Recommended)
Use the import git repository feature on openshift console.
- Navigate to Add page in the Developer console on openshift
- Select Dockerfile strategy
- Deployment type should be Deployment Config
- Secure routes
- Supply the environment variables after deployment
  
### Automated Command line Deployment
Using the scripts provided in `automate_development` folder, simplifies deployment. To use the scripts, docker and oc must be installed.

#### Build and push image
You can replace the image repository in the scripts `build.sh` in `automate_deployment` or use the repository we provided.
  ```bash
   automate_deployment/./build.sh
   ```
#### Deploy 
If the image repository was changed when building, update the `development.yaml` file in `k8s` folder with your image repository
  ```bash
   automate_deployment/./deploy.sh
   ```

### Tekton pipeline deployment script
Deploy with tekton with the pipeline deployment script in `automated_deployment` directory
   ```bash
   automate_deployment/./pipeline.sh
   ```


## License

This microservice is licensed under the [MIT License](LICENSE).


