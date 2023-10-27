from tensorflow import keras
import pandas as pd
import numpy as np
from process_dataset import DisastersData
from transformers import BertTokenizer, BertForSequenceClassification, pipeline
import torch
import intel_extension_for_pytorch as ipex

# Load the fine-tuned BERT model and tokenizer
model_path = "model/waverx-nlp"
tokenizer = BertTokenizer.from_pretrained("model/tokenizer")
model = BertForSequenceClassification.from_pretrained(model_path)
model = ipex.optimize(model)

# Define your tokenized labels and mapping dictionary or list
tokenized_labels =  ["Earthquake", "Drought",
          "Damaged Infrastructure", "Human Damage", "Human", "Land Slide", "Non Damage Buildings and  Street", "Non Damage Wildlife Forest",
          "Sea", "Urban Fire", "Wild Fire", "Water Disaster", "Humanitarian Aid"]

tokenized_labels.sort()

def predict(input_text):

    # Tokenize input text
    tokenized_input = tokenizer(input_text, return_tensors="pt")

    # Perform inference
    with torch.no_grad():
        outputs = model(**tokenized_input)

    # Get predicted probabilities and labels
    probabilities = torch.softmax(outputs.logits, dim=1)
    predicted_label_idx = torch.argmax(probabilities, dim=1).item()

    token_to_label_mapping = {idx: label for idx, label in enumerate(tokenized_labels)}

    # Map predicted label index to original label
    predicted_original_label = token_to_label_mapping[predicted_label_idx]

    # Convert tensor to numpy array
    probabilities = probabilities.numpy()

    # Convert probabilities to percentages
    probabilities_percentage = probabilities * 100
    
    #Set probability threshold
    threshold = 15
    
    # Find the maximum probability percentage
    max_probability = max(probabilities_percentage.tolist()[0])
    
    if max_probability < threshold:
    # Assign a specific label when the maximum probability is below the threshold
        predicted_label = "Prediction Failed"
    
    # Create a dictionary from the list of probabilities and labels
    result_dict = {key: value for key, value in zip(tokenized_labels, probabilities_percentage.tolist()[0])}

    print("Predicted Original Label:", predicted_original_label)
    print("Predicted Probabilities:",result_dict)
    
    return {"prediction": predicted_original_label,
            "probability": result_dict }

  

if __name__ == "__main__":
    # Input text you want to classify
    input_text = " Urgent earthquake."
    print("Predicting input")
    predict(input_text)
