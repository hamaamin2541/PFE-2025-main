import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const courses = [
  {
    title: "Web Development Fundamentals",
    description: "Learn the basics of web development including HTML, CSS, and JavaScript",
    category: "Développement Web",
    price: 299,
    rating: 4.5,
    thumbnail: "webdev.jpg",
    instructor: "64f1c2e4b5d3c2a1b2c3d4e5", // Replace with a valid instructor ID
  },
  {
    title: "Information Systems Management",
    description: "Master the fundamentals of IS management",
    category: "Systèmes d'Information",
    price: 399,
    rating: 4.8,
    thumbnail: "ism.jpg",
    instructor: "64f1c2e4b5d3c2a1b2c3d4e5", // Replace with a valid instructor ID
  }
];

const importData = async () => {
  try {
    // Clear existing courses only
    await Course.deleteMany();
    
    // Import courses (instructor will be set when teacher creates course)
    await Course.create(courses);

    console.log('Courses Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Course.deleteMany();
    console.log('Courses Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
