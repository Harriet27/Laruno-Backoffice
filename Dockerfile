# DEVELOPMENT

FROM node:latest AS dev

ENV NODE_ENV=development

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

# PRODUCTION

FROM node:latest AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /var/www/backoffice/laruno.id

COPY package.json ./

RUN yarn install --only=production

COPY . .

COPY --from=dev /app/build /var/www/backoffice/laruno.id