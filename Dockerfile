# Base image
FROM node:latest as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files to container
COPY . .

# Build the project
RUN npm run build

# Production image
FROM nginx:latest

# Copy build output to Nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port used by Nginx
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]