FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the TypeScript app
RUN npm run build

# Expose the application port (adjust if needed)
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]