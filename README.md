
# WaverX-NLP Microservice for Climate Wavers

## Overview

The `waverX-NLP` microservice is a part of the Climate Wavers disaster response application. It is responsible for processing user reports using a fine-tuned BERT model, developed with Hugging Face, to classify posts into different disaster labels. The model covers a range of disaster categories, including Earthquake, Drought, Damaged Infrastructure, Human Damage, Human, Land Slide, Non-Damage Buildings and Street, Non-Damage Wildlife Forest, Sea, Urban Fire, Wild Fire, Water Disaster, and Humanitarian Aid. The microservice is built on the OpenShift Data Science platform, utilizing the Intel oneAPI toolkit in a Jupyter Notebook environment. The model is optimized with Intel PyTorch extensions and served using Flask.

## Features

- **Natural Language Processing (NLP):** Utilizes a fine-tuned BERT model from Hugging Face for classifying user reports into various disaster labels.
- **Disaster Labels:** Classifies posts into specific disaster categories, aiding in efficient disaster response.
- **Intel Optimization:** The model is optimized using the Intel oneAPI toolkit and PyTorch extensions for enhanced performance.
- **Flask API:** The model is served through a Flask API for seamless integration with other microservices.

## Technologies Used

- BERT Model (Hugging Face)
- PyTorch
- Intel oneAPI Toolkit
- Intel PyTorch Extension
- Flask
- OpenShift Data Science
- Jupyter Notebook

## Setup

### Prerequisites

- Python installed
- PyTorch and Hugging Face transformers library installed
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

   - Set up necessary configurations for the BERT model and Flask API.

4. Start the microservice:

```bash
python app.py
```

## Usage

Describe how users can interact with the microservice, including API endpoints, request and response formats, and any other relevant details.

## Model Training

Include information on how the BERT model was fine-tuned, mentioning the Jupyter Notebook environment, Intel oneAPI toolkit, and PyTorch optimizations.

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
Deploy with tekton with the pipeline deployment script in `automated_deployment` directory. Setup environment variabes after deployment
   ```bash
   automate_deployment/./tekton_pipeline.sh
   ```

## License

This microservice is licensed under the [MIT License](LICENSE).

