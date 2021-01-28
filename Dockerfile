# Build Environtment
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

COPY .env.example ./

ADD .env.example .env

RUN yarn install

COPY . .

RUN yarn build

# Product env
COPY . . 

#COPY --from=build /app/build/* /var/www/backoffice.laruno.id

EXPOSE 8000
