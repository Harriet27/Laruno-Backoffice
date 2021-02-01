# Build Environtment
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

COPY .env.example ./

ADD .env.example .env

RUN npm install

COPY . .

# RUN npm run build

# COPY . . 

EXPOSE 8000

CMD ["npm", "start"]