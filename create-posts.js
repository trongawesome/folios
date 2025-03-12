const fs = require('fs');
const path = require('path');

const baseDir = 'www/content/posts';

// Function to get image filename from directory
const getImageFilename = (imagesDir) => {
  if (!fs.existsSync(imagesDir)) return null;
  const files = fs.readdirSync(imagesDir)
    .filter(file => {
      // Filter out system files and only include image files
      return !file.startsWith('.') && // Excludes .DS_Store and other hidden files
        /\.(jpg|jpeg|png|gif)$/i.test(file); // Only include image files
    });
  return files.length > 0 ? files[0] : null;
};

// Template for the MDX content
const getMDXContent = (date, imageFilename) => {
  let title = imageFilename ? path.parse(imageFilename).name : date;
  
  // First clean up by replacing dashes, underscores, em dashes with spaces and removing numbers
  title = title.replace(/[-_—]/g, ' ').replace(/\d+/g, '').trim();
  
  // Try to extract just the name part
  // Pattern 1: "Name — Job Title" or "Name - Job Title"
  const dashPattern = /^(.*?)(?:\s+[—-]\s+.*)?$/;
  
  // Pattern 2: Look for common job title indicators
  const jobTitlePattern = /^(.*?)(?:\s+(?:UX|UI|Product|Design|Designer|Lead|Manager|Director|Developer|Engineer|Web|Webflow|Frontend|Full Stack).*)?$/i;
  
  // Apply patterns in sequence
  const dashMatch = title.match(dashPattern);
  if (dashMatch && dashMatch[1]) {
    title = dashMatch[1].trim();
  }
  
  const jobMatch = title.match(jobTitlePattern);
  if (jobMatch && jobMatch[1]) {
    title = jobMatch[1].trim();
  }
  
  // Convert ALL CAPS to Title Case
  title = title.replace(/\w\S*/g, (txt) => {
    // If the word is all uppercase, convert to title case
    if (txt === txt.toUpperCase()) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
    // Otherwise leave it as is
    return txt;
  });
  
  return `---
title: ${title}
author: UX & Product Designer
date: ${date}
hero: ./images/${imageFilename || `${date}.jpg`}
excerpt: Pafolios is a collection of awesome portfolios and case studies from Product, UI/UX, Creative Designers. Learn and improve your design skills with real-world examples.
siteLink: 
---
`;
};

// Function to create backup of MDX file
const backupMDXFile = (mdxPath) => {
  if (fs.existsSync(mdxPath)) {
    const backupPath = `${mdxPath}.backup`;
    fs.copyFileSync(mdxPath, backupPath);
    return true;
  }
  return false;
};

// Function to update posts
const updatePosts = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Keep track of updated files
  const updatedFiles = [];
  
  // Loop through each date
  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    const formattedDate = date.toISOString().split('T')[0];
    const postDir = path.join(baseDir, formattedDate);
    const imagesDir = path.join(postDir, 'images');
    const mdxPath = path.join(postDir, 'index.mdx');
    
    if (fs.existsSync(postDir)) {
      // Get image filename from images directory
      const imageFilename = getImageFilename(imagesDir);
      
      if (imageFilename) {
        // Create backup before updating
        const backupCreated = backupMDXFile(mdxPath);
        
        // Create or update index.mdx file
        fs.writeFileSync(mdxPath, getMDXContent(formattedDate, imageFilename));
        console.log(`Updated post for ${formattedDate} with image: ${imageFilename}`);
        
        if (backupCreated) {
          updatedFiles.push(mdxPath);
        }
      } else {
        console.log(`Warning: No valid image found in ${imagesDir}`);
      }
    }
  }
  
  // Save the list of updated files for potential revert
  if (updatedFiles.length > 0) {
    const updatesLogPath = path.join(__dirname, 'updates_log.json');
    const updateData = {
      timestamp: new Date().toISOString(),
      dateRange: `${startDate} to ${endDate}`,
      files: updatedFiles
    };
    
    let existingLogs = [];
    if (fs.existsSync(updatesLogPath)) {
      try {
        existingLogs = JSON.parse(fs.readFileSync(updatesLogPath, 'utf8'));
      } catch (e) {
        console.error('Error reading existing logs:', e);
      }
    }
    
    existingLogs.push(updateData);
    fs.writeFileSync(updatesLogPath, JSON.stringify(existingLogs, null, 2));
    console.log(`Logged ${updatedFiles.length} updates to updates_log.json`);
  }
};

// Function to revert changes
const revertChanges = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let revertCount = 0;
  
  // Loop through each date
  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    const formattedDate = date.toISOString().split('T')[0];
    const postDir = path.join(baseDir, formattedDate);
    const mdxPath = path.join(postDir, 'index.mdx');
    const backupPath = `${mdxPath}.backup`;
    
    if (fs.existsSync(backupPath)) {
      // Restore from backup
      fs.copyFileSync(backupPath, mdxPath);
      fs.unlinkSync(backupPath); // Remove backup file after restoring
      console.log(`Reverted changes for ${formattedDate}`);
      revertCount++;
    }
  }
  
  if (revertCount > 0) {
    console.log(`Successfully reverted changes for ${revertCount} posts.`);
  } else {
    console.log(`No backups found for the date range ${startDate} to ${endDate}.`);
  }
};

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

if (command === 'revert') {
  if (args.length >= 3) {
    revertChanges(args[1], args[2]);
  } else {
    console.log('Usage: node create-posts.js revert <start-date> <end-date>');
  }
} else if (args.length >= 2) {
  updatePosts(args[0], args[1]);
} else {
  // No default date range - require explicit dates
  console.log('Usage:');
  console.log('  To update posts: node create-posts.js <start-date> <end-date>');
  console.log('  To revert changes: node create-posts.js revert <start-date> <end-date>');
  console.log('Example: node create-posts.js 2025-03-01 2025-03-08');
}

console.log('Done!'); 