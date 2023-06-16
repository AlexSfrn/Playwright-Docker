FROM node:latest

FROM mcr.microsoft.com/playwright:focal
 
WORKDIR /app
 
# Environment path: node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

# Needed files in app folder in Docker image
COPY package.json /app/
COPY tests/ /app/tests/
COPY playwright.config.js /app/
# COPY config.toml /app/

# Needed libraries to Playwright
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

RUN npm install