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
from sklearn.metrics import classification_report
import config
from PIL import ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

import matplotlib
matplotlib.use("Agg")

LAYERS_TO_FREEZE = 172
# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-p", "--plot", type=str, default="plot.png",
                help="path to output loss/accuracy plot")
args = vars(ap.parse_args(args=[]))
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
    print("[INFO] compiling model...")
    model.compile(loss="binary_crossentropy", optimizer=opt,
                  metrics=["accuracy"])
    return model



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

def unfreeze_layer(baseModel, model):
    for layer in baseModel.layers[15:]:
        layer.trainable = True
    # loop over the layers in the model and show which ones are trainable
    # or not
    for layer in baseModel.layers:
        print("{}: {}".format(layer, layer.trainable))
    # for the changes to the model to take affect we need to recompile
    # the model, this time using SGD with a *very* small learning rate
    print("[INFO] re-compiling model...")
    opt = Adam(learning_rate=config.INIT_LR, decay=config.INIT_LR / config.UNFROZEN_NUM_EPOCHS)
    model.compile(loss="categorical_crossentropy", optimizer=opt,
                  metrics=["accuracy"])
    return model

def train_model(model, epochs):
    # train the model
    print("[INFO] training model...")
    H = model.fit(
        train_gen,
        steps_per_epoch=total_train // config.BS,
        validation_data=val_gen,
        validation_steps=total_val // config.BS,
        epochs=epochs)

    return H

def plot_training(H, N, plot_path):
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
    plt.savefig(plot_path)

print("Total training data === {}".format(total_train))
print("Total validating data === {}".format(total_val))
print("Total testing data === {}".format(total_test))

# initialize the training training data augmentation object
train_aug = ImageDataGenerator(
    rotation_range=25,
    zoom_range=0.1,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.2,
    horizontal_flip=True,
    fill_mode="nearest")
# initialize the validation/testing data augmentation object (which
# we'll be adding mean subtraction to)
val_aug = ImageDataGenerator()
# define the ImageNet mean subtraction (in RGB order) and set the
# the mean subtraction value for each of the data augmentation
# objects
mean = np.array([123.68, 116.779, 103.939], dtype="float32")
train_aug.mean = mean
val_aug.mean = mean


# initialize the training generator
train_gen = train_aug.flow_from_directory(
    config.TRAIN_PATH,
    class_mode="categorical",
    target_size=(224, 224),
    color_mode="rgb",
    shuffle=True,
    batch_size=config.BS)
# initialize the validation generator
val_gen = val_aug.flow_from_directory(
    config.VAL_PATH,
    class_mode="categorical",
    target_size=(224, 224),
    color_mode="rgb",
    shuffle=False,
    batch_size=config.BS)
# initialize the testing generator
test_gen = val_aug.flow_from_directory(
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
model = freeze_layer(model, base_model)


H = train_model(model, config.NUM_EPOCHS)
# reset the testing generator and then use our trained model to
# make predictions on the data
print("[INFO] evaluating network...")
test_gen.reset()
predIdxs = model.predict(test_gen, steps=(total_test // config.BS) + 1)
# for each image in the testing set we need to find the index of the
# label with corresponding largest predicted probability
predIdxs = np.argmax(predIdxs, axis=1)
# show a nicely formatted classification report
print(classification_report(test_gen.classes, predIdxs,
                            target_names=test_gen.class_indices.keys()))
N = config.NUM_EPOCHS
plot_training(H, N, config.WARMUP_PLOT_PATH)

# reset our data generators
train_gen.reset()
val_gen.reset()
# now that the head FC layers have been trained/initialized, lets
# unfreeze the final set of CONV layers and make them trainable
model = unfreeze_layer(base_model, model)
# train the model again, this time fine-tuning *both* the final set
# of CONV layers along with our set of FC layers
H = train_model(model, config.UNFROZEN_NUM_EPOCHS)

print("[INFO] evaluating after fine-tuning network...")
test_gen.reset()
predIdxs = model.predict(x=test_gen,
                         steps=(total_test // config.BATCH_SIZE) + 1)
predIdxs = np.argmax(predIdxs, axis=1)
print(classification_report(test_gen.classes, predIdxs,
                            target_names=test_gen.class_indices.keys()))
N = config.UNFROZEN_NUM_EPOCHS
plot_training(H, 20, config.UNFROZEN_PLOT_PATH)

# serialize the model to disk
print("[INFO] saving model...")
model.save(f'{config.MODEL_PATH}/keras')


