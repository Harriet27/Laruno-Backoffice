# Build Environtment
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

COPY .env.example ./

ADD .env.example .env

RUN npm install

COPY . .

RUN npm run build

# Product env
COPY . . 

#COPY ./build/* /var/www/backoffice.laruno.id

EXPOSE 8000
