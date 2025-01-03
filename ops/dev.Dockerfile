# Base image
FROM oven/bun:latest as base

# Set working directory
WORKDIR /app

# Copy package files (bun uses bun.lockb as the lock file)
COPY bun.lockb ./
COPY package.json ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the desired port
EXPOSE 3000

# Start the application using bun dev
CMD ["bun", "run", "dev"]
