# Build Environtment
FROM node:14-alpine AS build

WORKDIR /app

COPY package*.json ./

COPY .env.example ./

ADD .env.example .env

RUN yarn install

COPY . .

CMD ["yarn", "build"]

RUN npm run build

# Production Environment
FROM httpd:2.4

COPY --from=build /app/build /var/www/backoffice.laruno.id

EXPOSE 8000
