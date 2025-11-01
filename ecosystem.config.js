module.exports = {
  apps: [
    {
      name: "taxiwale-partners",
      script: "node_modules/.bin/next",
      args: "start -p 3001",
      cwd: "/var/www/taxiwale-partners",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      }
    }
  ]
}
