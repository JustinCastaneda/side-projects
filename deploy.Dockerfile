FROM node:8-alpine

# Install Git
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

ENV PORT 80

ARG NODE_ENV=development
ENV NODE_ENV ${NODE_ENV}

# Copy package.json & yarn.lock file for yarn install
COPY package.json yarn.lock /usr/src/app/
WORKDIR /usr/src/app

RUN yarn install --silent

# Create app directory
COPY . /usr/src/app

RUN yarn build

CMD [ "yarn", "start" ]
