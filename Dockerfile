# Base image
FROM node:latest as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy project files to container
COPY . .

# Build the project
RUN npm run build

# Production image
FROM nginx:latest

# Copy the production build of the app from the builder stage to the Nginx web root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port on which Nginx will listen
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]