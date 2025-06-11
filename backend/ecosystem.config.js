module.exports = {
  apps: [
    {
      name: "pakautomotive-backend",
      script: "src/index.ts",
      interpreter: "./node_modules/.bin/ts-node",
      instances: 1,
      max_memory_restart: "300M",
      watch: true,
      log_date_format: "DD-MM HH:mm:ss",
      out_file: "./out.log",
      error_file: "./error.log",
      merge_logs: true,
      env_development: {
        NODE_ENV: "development",
        PORT: 8080
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8080,
        script: "build/index.js", // compiled JS
        interpreter: "node"
      }
    }
  ]
};
