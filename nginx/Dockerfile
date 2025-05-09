FROM nginx:latest
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY ./webapp/dist /usr/share/nginx/html

# Expose port 80 (optional, but good practice)
EXPOSE 80

# Command to run Nginx (default in the base image, good to keep)
CMD ["nginx", "-g", "daemon off;"]