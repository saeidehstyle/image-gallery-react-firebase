# Image Gallery App with Firebase and React

This project is a simple image gallery application built with **React**, **Firebase Firestore**, **Firebase Storage**, and **Framer Motion** for animations. It allows users to upload, view, and delete images stored in Firebase. The images are displayed in a responsive grid layout, and users can enlarge or delete any image they have uploaded.

## Features

- **Upload Images**: Users can upload `.png` or `.jpeg` images, which are stored in Firebase Storage. The image metadata is saved in Firestore.
- **Real-time Gallery**: Images are fetched and updated in real-time from Firestore, allowing new uploads to appear instantly.
- **Upload Progress**: Shows a progress bar indicating the current upload progress.
- **Image Enlargement**: Users can click on an image to view it in an enlarged modal.
- **Delete Images**: Users can delete images from both Firestore and Firebase Storage.
- **Smooth Animations**: Includes animations for image hover and modal transitions using **Framer Motion**.

## Prerequisites

- Node.js v14 or higher installed
- Firebase project set up with Firestore and Storage enabled

## Getting Started

### Installation

