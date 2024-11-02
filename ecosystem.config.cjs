module.exports = {
  apps: [
    {
      name: "feliz-viernes",
      script: "bun",
      args: "start",
      cron_restart: "0 */12 * * *",
      watch: false,
      autorestart: true,
    },
  ],
};
