# DEVELOPMENT

FROM node:latest AS dev

ENV NODE_ENV=development

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# PRODUCTION

FROM node:latest AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /var/www/backoffice/laruno.id

COPY package.json ./

RUN npm install --only=production

COPY . .

COPY --from=dev /app/build /var/www/backoffice/laruno.id