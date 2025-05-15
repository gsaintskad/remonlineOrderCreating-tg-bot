
FROM node:18-slim AS base

RUN apk add --no-cache sqlite

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y sqlite3 --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./

RUN npm i --omit=dev

COPY . .

RUN mkdir -p /usr/src/app/data
ENV DB_FILE_PATH="/usr/src/app/data/main.db"

# Run database migrations.
# RUN npx db-migrate up --env prod
RUN npm run migrate:up
RUN sqlite3 "$DB_FILE_PATH" "INSERT INTO branches(id, name, public_name, manager_id) VALUES('112954', 'name', 'public name', '182200');"

VOLUME /usr/src/app/data


ENV ENV=prod

EXPOSE 3000

CMD ["npm", "run", "prod"]
