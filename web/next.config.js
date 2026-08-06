const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  // Pin the workspace root. Without this, Next walks up the filesystem looking
  // for a lockfile and can pick a stray one from the user's home directory.
  outputFileTracingRoot: path.join(__dirname),

  // Next 16 writes its own AGENTS.md / CLAUDE.md into this folder on every run.
  // This repository already has a CLAUDE.md at the root that defines how the
  // lessons must be taught; a nested one would shadow it. Keep it off.
  agentRules: false,
};
