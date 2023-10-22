import random
import shutil
import os
from model_config import config
from imutils import paths
from PIL import Image
from datetime import datetime


#grab the paths to all input images in the original input directory
# and shuffle them
imagePaths = list(paths.list_images(config.INPUT_DATASET))
random.seed(42)
random.shuffle(imagePaths)
# compute the training and testing split
index = int(len(imagePaths) * config.TRAIN_SPLIT)
trainPaths = imagePaths[:index]
testPaths = imagePaths[index:]
# we'll be using part of the training data for validation
index = int(len(trainPaths) * config.VAL_SPLIT)
valPaths = trainPaths[:index]
trainPaths = trainPaths[index:]
# define the datasets that we'll be building
datasets = [
	("training", trainPaths, config.TRAIN_PATH),
	("validation", valPaths, config.VAL_PATH),
	("testing", testPaths, config.TEST_PATH)
]

# loop over the datasets
for (dType, imagePaths, baseOutput) in datasets:
	# show which data split we are creating
	print("[INFO] building '{}' split".format(dType))
	# if the output base output directory does not exist, create it
	if not os.path.exists(baseOutput):
		print("[INFO] 'creating {}' directory".format(baseOutput))
		os.makedirs(baseOutput)
	# loop over the input image paths
	for inputPath in imagePaths:
		# extract the filename of the input image along with its
		# corresponding class label
		filename = inputPath.split(os.path.sep)[-1]
		label = inputPath.split(os.path.sep)[-2]
		# build the path to the label directory
		labelPath = os.path.sep.join([baseOutput, label])
		# if the label output directory does not exist, create it
		if not os.path.exists(labelPath):
			print("[INFO] 'creating {}' directory".format(labelPath))
			os.makedirs(labelPath)
		# construct the path to the destination image and then copy
		# the image itself
		p = os.path.sep.join([labelPath, filename])
		shutil.copy2(inputPath, p)

# Total number of image paths in training, validation,
# and testing directories
totalTrain = len(list(paths.list_images(config.TRAIN_PATH)))
totalVal = len(list(paths.list_images(config.VAL_PATH)))
totalTest = len(list(paths.list_images(config.TEST_PATH)))


def filter_valid_images(directory):
    valid_files = []
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        for file in os.listdir(file_path):
            try:
                # Attempt to open the file as an image
                Image.open(f'{file_path}/{file}')
                current_time = datetime.now()
                formatted_time = current_time.strftime('%Y-%m-%d %H:%M:%S')
                valid_files.append(file)
                # Log results
                with open('dataset_filtering.log', 'a') as log:
                    log.write(f'{file} is valid -[{formatted_time}]\n')
            except OSError as e:
                # Handle exceptions and log the error
                image_path = os.path.join(file_path, file)
                current_time = datetime.now()
                formatted_time = current_time.strftime('%Y-%m-%d %H:%M:%S')
                os.remove(image_path)
                with open('dataset_filtering.log', 'w') as log:
                    log.write(f"Skipping file {file}: {e} -[{formatted_time}]\n")

            except Exception as e:
                # Handle other exceptions
                image_path = os.path.join(file_path, file)
                current_time = datetime.now()
                formatted_time = current_time.strftime('%Y-%m-%d %H:%M:%S')
                os.remove(image_path)
                with open('dataset_filtering.log', 'w') as log:
                    log.write(f"Unexpected error: {e} -[{formatted_time}]\n")
    return len(valid_files)

valid_train = filter_valid_images(config.TRAIN_PATH)
print("[INFO] Total training data === {}".format(totalTrain))
print("[INFO] Total valid training data === {}".format(valid_train))
valid_val = filter_valid_images(config.VAL_PATH)
print("[INFO] Total validating data === {}".format(totalVal))
print("[INFO] Total valid validating data === {}".format(valid_val))
valid_test = filter_valid_images(config.TEST_PATH)
print("[INFO] Total testing data === {}".format(totalTest))
print("[INFO] Total valid testing data === {}".format(valid_test))
