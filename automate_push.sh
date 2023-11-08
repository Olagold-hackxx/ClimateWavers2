#!/bin/bash

echo "Hi Climate Waver, kindly Enter your commit message"
read message


git add .
git commit -m "$message"
git push
