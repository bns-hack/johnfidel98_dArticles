# Use the official node image as a base
FROM node:16-alpine

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN yarn install

# Copy the rest of the app files
COPY . .

# Build the app
RUN yarn build

# Install serve globally
RUN yarn global add serve

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["serve", "-l", "3000", "-s", "build"]
