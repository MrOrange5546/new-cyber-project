# Stage 1: Build stage
FROM node:18-alpine as build

# Install necessary dependencies for building
RUN apk update && \
    apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

# Set NODE_ENV for build
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /opt/app

# Copy package.json and package-lock.json for installing dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Stage 2: Production stage
FROM node:18-alpine

# Install necessary dependencies for production
RUN apk add --no-cache vips-dev

# Set NODE_ENV for production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /opt/app

# Copy dependencies from build stage
COPY --from=build /opt/app/node_modules ./node_modules

# Copy built files from build stage
COPY --from=build /opt/app ./

# Change ownership to non-root user
RUN chown -R node:node /opt/app

# Switch to non-root user
USER node

# Expose port
EXPOSE 1337

# Command to run the application
CMD ["yarn", "start"]
