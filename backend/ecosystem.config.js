module.exports = {
  apps: [
    {
      name: "PakAutomotive Backend",
      script: "src/index.ts",
      cwd: "/var/www/pakautomotive.com/backend",
      interpreter: "node",
      interpreter_args: "--loader ts-node/esm", // if using ESM
      instances: 1,
      max_memory_restart: "300M",

      // Logs
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      merge_logs: true,
      log_date_format: "DD-MM HH:mm:ss Z",

      // Environment configs
      env: {
        NODE_ENV: "development",
        PORT: 8080,
        TS_NODE_PROJECT: "./tsconfig.json",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8080,
        // In production, PM2 should run the compiled JS
        script: "build/index.js",
        interpreter: "node",
      },
    },
  ],
};
