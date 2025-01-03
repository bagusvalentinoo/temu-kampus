# Stage 1: Build Stage
FROM oven/bun:latest AS builder

# Set the working directory
WORKDIR /app

# Copy all files to the container
COPY . .

# Install dependencies and build the project
RUN bun install && bun run lint:fix && bun run build

# Stage 2: Production Stage
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy build files from the builder stage
COPY --from=builder /app /app

# Expose port 3000
EXPOSE 3000

# Start the Next.js application
CMD ["bun", "run", "start"]
