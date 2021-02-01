FROM nginx:stable-alpine
# COPY ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf

# COPY --from=build /app/build /bin/www
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD [ "nginx", "-g", "daemon off;" ]