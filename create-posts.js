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
  const title = imageFilename ? path.parse(imageFilename).name : date;
  
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

// Function to update posts
const updatePosts = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
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
        // Create or update index.mdx file
        fs.writeFileSync(mdxPath, getMDXContent(formattedDate, imageFilename));
        console.log(`Updated post for ${formattedDate} with image: ${imageFilename}`);
      } else {
        console.log(`Warning: No valid image found in ${imagesDir}`);
      }
    }
  }
};

// Update posts for November 2024
updatePosts('2024-12-01', '2024-12-30');

console.log('Done updating posts!'); 