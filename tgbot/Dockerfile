FROM node:20-alpine

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache --virtual .npm-build-deps python3 make g++ && \
    npm install --only=production && \
    apk del .npm-build-deps

COPY . .

RUN apk add --no-cache --virtual .db-setup-deps sqlite-tools && \
    mkdir -p /usr/src/app/data && \
    node node_modules/.bin/db-migrate db:create main --verbose || true && \
    node node_modules/.bin/db-migrate up --verbose && \
    sqlite3 /usr/src/app/data/main.db "INSERT INTO branches(id, name, public_name, manager_id) VALUES('112954', 'name', 'public name', '182200');" || true && \
    apk del .db-setup-deps

VOLUME /usr/src/app/data
EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost:${PORT}/health || exit 1

CMD [ "node", "src/server.js" ]


