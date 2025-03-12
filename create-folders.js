const fs = require('fs');
const path = require('path');

const baseDir = 'www/content/posts';
const sourceImagesDir = path.join(process.env.HOME, 'Downloads/portfolios');

// Function to get image files sorted by creation date
const getSortedImageFiles = (directory) => {
  if (!fs.existsSync(directory)) {
    console.error(`Source directory does not exist: ${directory}`);
    return [];
  }

  const files = fs.readdirSync(directory)
    .filter(file => {
      // Filter out system files and only include image files
      return !file.startsWith('.') && // Excludes .DS_Store and other hidden files
        /\.(jpg|jpeg|png|gif)$/i.test(file); // Only include image files
    })
    .map(file => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        path: filePath,
        creationTime: stats.birthtime
      };
    });

  // Sort by creation time (oldest first)
  return files.sort((a, b) => a.creationTime - b.creationTime);
};

// Function to create folders for a date range and move images
const createFoldersAndMoveImages = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Ensure the base directory exists
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
    console.log(`Created base directory: ${baseDir}`);
  }
  
  // Get sorted image files
  const imageFiles = getSortedImageFiles(sourceImagesDir);
  
  if (imageFiles.length === 0) {
    console.warn(`No image files found in ${sourceImagesDir}`);
  }
  
  // Create an array of dates
  const dates = [];
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }
  
  console.log(`Found ${imageFiles.length} images to distribute among ${dates.length} days`);
  
  // Create folders and move images
  dates.forEach((date, index) => {
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    const postDir = path.join(baseDir, formattedDate);
    const imagesDir = path.join(postDir, 'images');
    
    // Create post directory if it doesn't exist
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
      console.log(`Created directory: ${postDir}`);
    } else {
      console.log(`Directory already exists: ${postDir}`);
    }
    
    // Create images subdirectory if it doesn't exist
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
      console.log(`Created images directory: ${imagesDir}`);
    }
    
    // Move an image if available
    if (index < imageFiles.length) {
      const imageFile = imageFiles[index];
      const destPath = path.join(imagesDir, imageFile.name);
      
      try {
        // Copy the file instead of moving to preserve the original
        fs.copyFileSync(imageFile.path, destPath);
        console.log(`Copied image ${imageFile.name} to ${formattedDate}/images/`);
      } catch (err) {
        console.error(`Error copying image ${imageFile.name}: ${err.message}`);
      }
    } else {
      console.log(`No image available for ${formattedDate}`);
    }
  });
};

// New function to revert changes for a date range
const revertChanges = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  console.log(`Reverting changes for date range: ${startDate} to ${endDate}`);
  
  // Create an array of dates
  const dates = [];
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }
  
  // Process each date
  dates.forEach(date => {
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    const postDir = path.join(baseDir, formattedDate);
    
    if (fs.existsSync(postDir)) {
      try {
        // Remove the directory and all its contents recursively
        fs.rmSync(postDir, { recursive: true, force: true });
        console.log(`Removed directory: ${postDir}`);
      } catch (err) {
        console.error(`Error removing directory ${postDir}: ${err.message}`);
      }
    } else {
      console.log(`Directory does not exist: ${postDir}`);
    }
  });
  
  console.log('Revert operation completed.');
};

// Get command line arguments
const args = process.argv.slice(2);
let startDate, endDate, operation = 'create';

// Check if the first argument is an operation flag
if (args[0] === '--revert' || args[0] === '-r') {
  operation = 'revert';
  args.shift(); // Remove the operation flag from args
}

if (args.length >= 2) {
  startDate = args[0];
  endDate = args[1];
} else if (args.length === 1) {
  // If only start date is provided, calculate the end date as the last day of that month
  startDate = args[0];
  const date = new Date(startDate);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  endDate = lastDay.toISOString().split('T')[0];
} else {
  console.error('Usage: node create-folders.js [--revert|-r] YYYY-MM-DD [YYYY-MM-DD]');
  console.error('If end date is not provided, folders will be created/reverted for the entire month of the start date.');
  process.exit(1);
}

// Validate dates
if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
  console.error('Dates must be in YYYY-MM-DD format');
  process.exit(1);
}

if (operation === 'create') {
  console.log(`Creating folders from ${startDate} to ${endDate} and moving images...`);
  createFoldersAndMoveImages(startDate, endDate);
  console.log('Done creating folders and moving images!');
} else if (operation === 'revert') {
  revertChanges(startDate, endDate);
} 