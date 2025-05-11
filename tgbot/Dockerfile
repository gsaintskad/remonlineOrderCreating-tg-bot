FROM node:23-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .



EXPOSE 8080
EXPOSE 3000
CMD [ "npm", "run", "dev" ]