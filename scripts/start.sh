#!/bin/bash

# Install npm packages
npm install

# Set up the database
npm run db:setup

# Build the project
npm run build

# Start the application
npm run start