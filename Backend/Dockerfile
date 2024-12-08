# Stage 1: Build Stage
FROM node:22 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the application code
COPY . .

# Build the application if needed (e.g., for TypeScript)
# Uncomment the below line if your backend needs building
# RUN yarn run build

# Stage 2: Production Stage
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app /app

# Install only production dependencies
RUN yarn install --production

# Expose the backend application port
EXPOSE 3000

# Start the backend application
CMD ["yarn", "start"]


