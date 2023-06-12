# Base image for dependencies
FROM node:18 AS dependencies

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install --frozen-lockfile

# Intermediate image for building the app
FROM dependencies AS builder

# Copy the entire project to the working directory
COPY . .

# Build the Next.js app
RUN yarn build

# Final image for running the app
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy built files and dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY package.json yarn.lock ./

# Set the command to start the app
CMD ["yarn", "start"]