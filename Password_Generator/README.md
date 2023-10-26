# Password Generator App

## Description

This is a web application that allows users to generate strong passwords with customizable preferences (length, uppercase, lowercase, numbers, special characters). Users can also log in via Google Authentication to save passwords with names and manage them using a Material-UI Data Table. Firebase is used to store password data securely.

## Live Demo

[Live Demo](https://passwordgenerator1245.netlify.app/)

## Features

- Password generation with custom options.
- Google Authentication for user login.
- Save generated passwords with names.
- View and manage saved passwords using a Material-UI Data Table.
- Delete saved passwords.
- Firebase integration for secure data storage.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Firebase: A cloud-based platform for building web and mobile apps.
- Material-UI: A popular React UI framework.
- Google Authentication: Secure user login.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the project dependencies.
4. Set up Firebase:
   - Create a Firebase project.
   - Configure Firebase for your app and enable Google Authentication.
   - Set up Firebase Realtime Database or Firestore for data storage.
   - Update Firebase configuration in your app.
5. Run `npm run dev` to start the development server.
6. Access the app in your web browser at `http://localhost:5173`.

## Usage

- Launch the app and sign in using your Google account.
- Generate strong passwords by selecting your preferences.
- Save passwords with names and view them in the Data Table.
- Delete passwords as needed.
