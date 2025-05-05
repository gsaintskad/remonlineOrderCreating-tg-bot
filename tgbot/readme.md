# remonlineOrderCreator
Create new client and order in remOnline with telegram bot


Getting Started:

1. Clone repo, install dependencies

`git clone <git-repo-url> && cd <remonlineBot> && npm i`

2. Set up local environment variables

`cp .env.example .env`

3. create db

`node node_modules/db-migrate/bin/db-migrate db:create main`

add main branch with

`insert into branches(id,name,public_name,manager_id) values("112954","name","public name","employee id")`

4. run migrations

`node node_modules/db-migrate/bin/db-migrate up`

5. Install PM2 

`sudo npm install pm2@latest -g`

6. Start process with PM2

`pm2 start ecosystem.config.js`

7. Save process to start with PM2

`pm2 save`

8. Make PM2 starts on boot

`pm2 startup`


Session details:

ctx.session.saved - wrote at least once

ctx.session.remonline_id - found or create remonline client