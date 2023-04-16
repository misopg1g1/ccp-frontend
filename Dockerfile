# Use an official Node.js runtime as a parent image
FROM node:lts

# Create a working directory for your application
WORKDIR /app

# Copy your application files to the container
COPY . .

# Install any needed packages for frontend and backend
RUN npm install
RUN cd server && npm install

# Build the frontend
RUN npm run build

# Install Nginx and supervisord
RUN apt-get update && apt-get install -y nginx supervisor

# Remove the default Nginx configuration and add your own
RUN rm /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/sites-enabled/

# Copy supervisord configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Start supervisord
CMD ["/usr/bin/supervisord"]

