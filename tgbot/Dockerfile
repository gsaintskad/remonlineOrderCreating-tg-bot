FROM node:23-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

# Install sqlite3 command-line tool
RUN apk add --no-cache sqlite

# Copy the rest of your application code
COPY . .

# Create a dedicated directory for database files
RUN mkdir -p /usr/src/app/data

# Run database creation, migration, and seeding scripts.
# These will initially create main.db in /usr/src/app/
RUN node node_modules/db-migrate/bin/db-migrate db:create main
RUN node node_modules/db-migrate/bin/db-migrate up
RUN sqlite3 main.db "INSERT INTO branches(id, name, public_name, manager_id) VALUES('112954', 'name', 'public name', '182200');"

# Move the populated database into the data directory
RUN mv main.db /usr/src/app/data/main.db

# Declare the volume for the data directory
VOLUME /usr/src/app/data

EXPOSE 8080
EXPOSE 3000

# IMPORTANT: Your application must now be configured to find the database
# at /usr/src/app/data/main.db or ./data/main.db
CMD [ "npm", "run", "dev" ]