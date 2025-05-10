FROM node:23-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest 

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80 (optional, but good practice)
EXPOSE 8080
# Command to run Nginx (default in the base image, good to keep)
CMD ["nginx", "-g", "daemon off;"]
