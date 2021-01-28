# Build Environtment
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

COPY .env.example ./

ADD .env.example .env

RUN yarn install

COPY . .

RUN yarn build

# Production Environment
#COPY . . 

#COPY --from=build /app/build/* /var/www/backoffice.laruno.id
COPY build /var/www/backoffice.laruno.id

EXPOSE 8000
