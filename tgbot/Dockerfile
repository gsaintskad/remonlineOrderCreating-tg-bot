# 1. Base Image
# Using a Node.js image. Node 18-alpine is a good LTS and lightweight choice.
FROM node:18-alpine AS base

# Install sqlite client for database initialization and seeding
RUN apk add --no-cache sqlite

# Set working directory
WORKDIR /usr/src/app

# 2. Install Dependencies
# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install production dependencies
RUN npm ci --omit=dev

# 3. Copy Application Code
# Copy the rest of your application code
COPY . .

# 4. Database Setup and Initialization
# Ensure the data directory exists
RUN mkdir -p /usr/src/app/data
ENV DB_FILE_PATH="/usr/src/app/data/main.db"

# Run database migrations.
# db-migrate up will create the SQLite file if it doesn't exist and then apply migrations.
RUN npx db-migrate up --env prod

# Initial data seeding (optional, but based on your readme.md)
# This assumes the 'branches' table is created by the migrations above.
# The readme.md suggests: insert into branches(id,name,public_name,manager_id) values("112954","name","public name","employee id")
# Corrected quoting: Outer double quotes for shell, inner single quotes for SQL string literals.
RUN sqlite3 "$DB_FILE_PATH" "INSERT OR IGNORE INTO branches(id, name, public_name, manager_id) VALUES('112954', 'Default Main Branch', 'Місто не вказано', '235741');"
# Added "OR IGNORE" to prevent errors if this script runs multiple times on an existing DB with this entry.
# Used "Місто не вказано" as public_name as it's a default in one of your migrations [cite: uploaded:tgbot/migrations/20240126131630-add-branch_id-and-branch_public_name-columns-to-telegram-users-table.js]
# Used "235741" as manager_id as it's a default in one of your migrations [cite: uploaded:tgbot/migrations/20240127231941-add-manager-column-to-branches-table.js]


# 5. Define Volume for Data Persistence
# This marks the directory where main.db is stored as a volume.
# When running the container, you should map this to a host directory or a named volume.
VOLUME /usr/src/app/data

# 6. Environment Variables
# Your application uses several environment variables.
# These should be passed to the Docker container at runtime.
ENV NODE_ENV=production
ENV ENV=prod
# Ensure DEV_DB (used in queries) is set to $DB_FILE_PATH at runtime.
# Example: -e DEV_DB="/usr/src/app/data/main.db"

# 7. Expose Port
# Your app listens on process.env.PORT || 3000
EXPOSE 3000

# 8. Command to Run the Application
# Your package.json has a "prod" script: "ENV=prod node -r dotenv/config app.mjs"
CMD ["npm", "run", "prod"]
