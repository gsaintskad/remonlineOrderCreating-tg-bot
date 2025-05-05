module.exports = {
    apps: [{
        name: "rembot",
        script: "app.mjs",
        watch: ["migrations", "remonline", "telegram"],
        ignore_watch: ["node_modules", "./main.db", "\\.git", "*.db-journal", "./*.db-journal"],
        node_args: '-r dotenv/config',
        env: {
            ENV: "prod",
        }
    }]
}