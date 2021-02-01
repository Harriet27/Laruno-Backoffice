# Build Environtment
FROM node:14-alpine as build

WORKDIR /app

COPY package*.json ./

COPY .env.example ./

ADD .env.example .env

RUN npm install --production

COPY . .

RUN npm run build

# EXPOSE 8000