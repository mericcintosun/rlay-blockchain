const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  // Pin the workspace root so Next doesn't walk up and pick a stray lockfile
  // from elsewhere on disk (this repo has multiple package.json files).
  outputFileTracingRoot: path.join(__dirname),

  // Same reason as web/next.config.js: don't let Next write its own
  // AGENTS.md/CLAUDE.md here - the repo root CLAUDE.md already governs this project.
  agentRules: false,
};
