Workshop setup — required tools
================================

For the SonarQube workshop you'll need the following tools installed on your machine:

- Git
- Docker
- Docker Compose (Docker Desktop includes Docker Compose; on CLI you can install the plugin)
- Node.js 20+ (Node 20 or newer)
- Sonar CLI (SonarQube scanner — npm package `@sonar/scan`)

Quick install (macOS using Homebrew)

```bash
# Git
brew install git

# Docker (Docker Desktop)
brew install --cask docker

# Docker Compose plugin (if you need the standalone plugin)
brew install docker-compose-plugin

# Install nvm (recommended) and Node 20
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
# then restart your shell and run:
nvm install 20

# Install Sonar CLI globally via npm (recommended for local dev; for CI you may download the official distro):
npm install -g @sonar/scan
```

Notes

- Docker Desktop includes Docker Compose; if using a Linux server you may install the Compose plugin or use the standalone binary.
- If you prefer a system Node.js install, use your package manager or the official Node installer. Using `nvm` makes switching Node versions easy.
- The Sonar CLI can also be downloaded from the SonarQube website (recommended for CI). If you use npm, `@sonar/scan` provides a convenient CLI wrapper.

If you'd like, I can add Windows and Linux-specific commands or include a script to verify these tools are installed on a developer machine.
