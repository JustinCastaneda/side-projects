#!/bin/bash

$(aws ecr get-login --no-include-email --region us-east-1)

docker build -t 418-intelligence/def3nse-client -f deploy.Dockerfile . 
docker tag 418-intelligence/def3nse-client:latest 469424530899.dkr.ecr.us-east-1.amazonaws.com/418-intelligence/def3nse-client 
docker push 469424530899.dkr.ecr.us-east-1.amazonaws.com/418-intelligence/def3nse-client:latest

