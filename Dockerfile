# Base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy monorepo dependency files first
COPY package.json package-lock.json turbo.json ./
COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install

# Install ts-node-dev globally for dev mode (optional if you use it per package)
# RUN npm install -g ts-node-dev

# Copy the rest of the repo
COPY . .

# Set environment variable
ENV NODE_ENV=development

RUN yarn workspace @wayfarer/db prisma generate

# Expose ports for all services (you can skip this if you're using reverse proxy later)
EXPOSE 3000 3001 3002 3003

# Run all dev servers in parallel using turborepo
CMD ["npm", "run", "dev"]