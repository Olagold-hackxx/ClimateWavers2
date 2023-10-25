
# set the matplotlib backend so figures can be saved in the background
import argparse
import os
import numpy as np
import matplotlib.pyplot as plt
from imutils import paths
from sklearn.metrics import classification_report

from tensorflow.keras.applications import ResNet50
from tensorflow.keras.optimizers.legacy import Adam
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import Flatten
from tensorflow.keras.layers import Dropout
from tensorflow.keras.layers import AveragePooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from model_config import config
from PIL import ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

import matplotlib
matplotlib.use("Agg")
# import the necessary packages

LAYERS_TO_FREEZE = 172
# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-p", "--plot", type=str, default="plot.png",
                help="path to output loss/accuracy plot")
args = vars(ap.parse_args())
print(args)
# Total number of image paths in training, validation,
# and testing directories
total_train = len(list(paths.list_images(config.TRAIN_PATH)))
total_val = len(list(paths.list_images(config.VAL_PATH)))
total_test = len(list(paths.list_images(config.TEST_PATH)))


def freeze_layer(model, base_model):
    """Freeze all layers and compile the model"""
    for layer in base_model.layers:
        layer.trainable = False
    opt = Adam(learning_rate=config.INIT_LR, decay=config.INIT_LR / config.NUM_EPOCHS)
    model.compile(loss="binary_crossentropy", optimizer=opt,
	metrics=["accuracy"])



def new_layer(base_model):
    # construct the new layer of the model that will be placed on top of the
    # the base model
    top_model = base_model.output
    top_model = AveragePooling2D(pool_size=(7, 7))(top_model)
    top_model = Flatten(name="flatten")(top_model)
    top_model = Dense(256, activation="relu")(top_model)
    top_model = Dropout(0.5)(top_model)
    top_model = Dense(len(config.CLASSES), activation="softmax")(top_model)
    model = Model(inputs=base_model.input, outputs=top_model)
    return model


print("Total training data === {}".format(total_train))
print("Total validating data === {}".format(total_val))
print("Total testing data === {}".format(total_test))


def train_model(model):
    # train the model
    print("[INFO] training model...")
    H = model.fit(
        train_gen,
        steps_per_epoch=total_train // config.BS,
        validation_data=val_gen,
        validation_steps=total_val // config.BS,
        epochs=0)

    return H


# initialize the training training data augmentation object
trainAug = ImageDataGenerator(
    rotation_range=25,
    zoom_range=0.1,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.2,
    horizontal_flip=True,
    fill_mode="nearest")
# initialize the validation/testing data augmentation object (which
# we'll be adding mean subtraction to)
valAug = ImageDataGenerator()
# define the ImageNet mean subtraction (in RGB order) and set the
# the mean subtraction value for each of the data augmentation
# objects
mean = np.array([123.68, 116.779, 103.939], dtype="float32")
trainAug.mean = mean
valAug.mean = mean


# initialize the training generator
train_gen = trainAug.flow_from_directory(
    config.TRAIN_PATH,
    class_mode="categorical",
    target_size=(224, 224),
    color_mode="rgb",
    shuffle=True,
    batch_size=config.BS)
# initialize the validation generator
val_gen = valAug.flow_from_directory(
    config.VAL_PATH,
    class_mode="categorical",
    target_size=(224, 224),
    color_mode="rgb",
    shuffle=False,
    batch_size=config.BS)
# initialize the testing generator
test_gen = valAug.flow_from_directory(
    config.TEST_PATH,
    class_mode="categorical",
    target_size=(224, 224),
    color_mode="rgb",
    shuffle=False,
    batch_size=config.BS)


# off
print("[INFO] preparing model...")
base_model = ResNet50(weights="imagenet", include_top=False,
                     input_tensor=Input(shape=(224, 224, 3)))

# place the top FC model on top of the base model (this will become
# the actual model we will train)
model = new_layer(base_model)
freeze_layer(model, base_model)


H = train_model(model)
# reset the testing generator and then use our trained model to
# make predictions on the data
print("[INFO] evaluating network...")
test_gen.reset()
predIdxs = model.predict(test_gen,
                                   steps=(total_test // config.BS) + 1)
# for each image in the testing set we need to find the index of the
# label with corresponding largest predicted probability
predIdxs = np.argmax(predIdxs, axis=1)
# show a nicely formatted classification report
print(classification_report(test_gen.classes, predIdxs,
                            target_names=test_gen.class_indices.keys()))
# serialize the model to disk
print("[INFO] saving model...")
model.save(config.MODEL_PATH)

N = config.NUM_EPOCHS
plt.style.use("ggplot")
plt.figure()
plt.plot(np.arange(0, N), H.history["loss"], label="train_loss")
plt.plot(np.arange(0, N), H.history["val_loss"], label="val_loss")
plt.plot(np.arange(0, N), H.history["accuracy"], label="train_acc")
plt.plot(np.arange(0, N), H.history["val_accuracy"], label="val_acc")
plt.title("Training Loss and Accuracy on Dataset")
plt.xlabel("Epoch #")
plt.ylabel("Loss/Accuracy")
plt.legend(loc="lower left")
plt.savefig(args["plot"])
