
FROM node:20-slim AS base


WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y sqlite3 --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./

RUN npm i --omit=dev

COPY . .

ENV DB_FILE_PATH="/usr/src/app/data/main.db"

VOLUME /usr/src/app/data


ENV ENV=prod

EXPOSE 3000

CMD ["npm", "run", "prod"]
