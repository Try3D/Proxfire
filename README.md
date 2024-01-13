# Proxfire 🔥 
Proxfire is a proximity social media application built using React and Firebase

## Setup for development
- Create a Firebase account and make a new Firebase project.
- Provision a new web SDK for your project. You will receive a list of Environment variables from Firebase for the particular project.
```
apiKey: XXX
authDomain: XXX
projectId: XXX
storageBucket: XXX
messagingSenderId: XXX
appId: XXX
```
- Clone this repository into your computer and create a new `.env` file in the root of your project with the following text. Note: This file is **not** supposed to be public and hence, should not be version controlled.
```
VITE_FIREBASE_API_KEY=XXX
VITE_FIREBASE_AUTH_DOMAIN=XXX
VITE_FIREBASE_PROJECT_ID=XXX
VITE_FIREBASE_STORAGE_BUCKET=XXX
VITE_FIREBASE_MESSAGING_SENDER_ID=XXX
VITE_FIREBASE_APP_ID=XXX
```
- Now, you can install the dependencies and run the server
```bash
$ npm i # Install dependencies
$ npm run dev # Run the development server
```

## Setup for hosting
When deploying the project to any hosting platform, add these entries as key/value pairs in the deployment's environment variables

## Why
I already made a similar project with html, css, js and flask for the backend. I wanted to recreate it with React for the feels and try out Firebase rather than roll out my own backend.

## Conclusion
- React is pretty cool
- Firebase is dangerously costly. I swear in just my one day of testing, I was dangerously close to the free limit. And it's proprietry nature means that migrating away from firestore is also a pain.
