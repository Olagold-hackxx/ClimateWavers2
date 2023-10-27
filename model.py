import torch
from bert import BERTClassifier
from config import BertOptimConfig
from train_model import train_model
from evaluate import eval_model
from data_loader import DisastersDataLoader


epochs = 3
num_labels = 13
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
data_path = {
    "train": "dataset/train_disaster_dataset.csv",
    "val": "dataset/val_disaster_dataset.csv",
    "test": "dataset/test_disaster_dataset.csv",
}
data_loaders = DisastersDataLoader(data_path, batch_size=8)
model = BERTClassifier(num_labels=num_labels).get_model()
optim_config = BertOptimConfig(
    model=model, train_dataloader=data_loaders.train_dataloader, epochs=epochs
)
    ## execute the training routine
model = train_model(
    model=model,
    optimizer=optim_config.optimizer,
    scheduler=optim_config.scheduler,
    train_dataloader=data_loaders.train_dataloader,
    validation_dataloader=data_loaders.validation_dataloader,
    epochs=epochs,
    device=device,
)

## test model performance on unseen test set
eval_model(model=model, test_dataloader=data_loaders.test_dataloader, device=device)
