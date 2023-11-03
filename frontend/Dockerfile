# Use the official Node.js 14 image as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install project dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build the application for production
# RUN npm run build

# Expose the port the application will run on
EXPOSE 3000

# Command to run the application
CMD [ "npm", "run", "dev" ]
