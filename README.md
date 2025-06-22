# UCloset3D

This is a demo Angular application for experimenting with a virtual closet experience. It integrates with real services such as Ready Player Me for avatar generation, Remove.bg for background removal, BodyBlock for measurements and Firebase for storage.

## Setup

1. Clone the repository
   ```bash
   git clone <repository-url>
   ```
2. Install Node.js 16 or higher and navigate into the project directory
   ```bash
   cd UCloset3D
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Start the development server
   ```bash
  npm start
  ```
Install the Firebase CLI (if you haven’t already):

npm install -g firebase-tools
Log in to Firebase and select your project:

firebase login
firebase use ucloset3d
Build the Angular project:

npm install
npm run build
Deploy to Firebase Hosting:

firebase deploy
## Configuration

Add your API keys in `src/environments/environment.ts`:

```
export const environment = {
  production: false,
  readyPlayerMeApiKey: 'YOUR_READY_PLAYER_ME_API_KEY',
  removeBgApiKey: 'YOUR_REMOVE_BG_API_KEY',
  barcodeApiKey: 'YOUR_BARCODE_API_KEY',
  bodyBlockApiKey: 'YOUR_BODYBLOCK_API_KEY',
  firebase: {
    apiKey: 'YOUR_FIREBASE_API_KEY',
    authDomain: 'YOUR_FIREBASE_AUTH_DOMAIN',
    projectId: 'YOUR_FIREBASE_PROJECT_ID',
    storageBucket: 'YOUR_FIREBASE_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_FIREBASE_SENDER_ID',
    appId: 'YOUR_FIREBASE_APP_ID'
  }
};
```

Deploying to Firebase requires a valid Firebase project configuration. Ensure `firebase.json` has `"public": "dist/ucloset3d"` to match the Angular build output.

## Authentication

The login screen uses Firebase Authentication with email and password credentials. You can create an account using the new **Sign Up** page at `/signup` and then sign in with those credentials. Upon success you will be taken to the photo upload page.

The UI provides the following pages:
1. **Upload Photo** – process an image with background removal. Drag and drop or select a file to begin.
2. **Avatar Preview** – display the generated avatar with an option to continue.
3. **Avatar View** – preview a Ready Player Me avatar.
4. **Mix & Match** – list outfit items in a simple mix and match interface.
5. **Virtual Closet** – style an avatar with draggable outfit pieces.

## Six-Screen Workflow

1. **Login** – authenticate with a demo account.
2. **Avatar Generation** – create a personalized Ready Player Me avatar and collect measurements using BodyBlock.
3. **Outfit Uploads** – add clothing images with drag-and-drop support and automatically remove the background.
4. **Virtual Closet** – manage wardrobe items with drag‑and‑drop sorting.
5. **Mix & Match** – arrange outfits using pieces from the virtual closet.
6. **Gallery Sharing** – publish completed looks to a shareable gallery page.

## Development

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the development server
   ```bash
   npm start
   ```
3. Build for production
   ```bash
   npm run build
   ```

Navigate between pages using the links in the header. The Angular router loads each feature on its own route.

