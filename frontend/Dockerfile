# Stage 1: Build the React application
FROM node:22 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the React application for production
RUN yarn run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d

# Copy the React build files to the Nginx web directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the Nginx server port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
