# DEVELOPMENT

FROM node:alpine AS dev

ENV NODE_ENV=development

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

# PRODUCTION

FROM node:alpine AS production

COPY --from=dev /app/build /var/www/backoffice/laruno.id