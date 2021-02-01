# # Step 1
# FROM node:10-alpine as build-step
# RUN mkdir /app
# WORKDIR /app
# COPY package*.json /app
# RUN npm install
# COPY .env.example ./
# ADD .env.example .env
# COPY . /app
# RUN npm run build

# # Stage 2
# FROM nginx:1.17.1-alpine
# COPY --from=build-step /app/build /usr/share/nginx/html

FROM node:12.2.0-alpine as build
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

# production image using nginx and including our
# compiled app only. This is called multi-stage builds
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]