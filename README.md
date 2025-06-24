# UCloset3D

This is a demo Angular application for experimenting with a virtual closet experience. It integrates with Firebase for storage and can generate avatars using either Ready Player Me or a local open‑source pipeline.

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

### Optional open-source avatar server

The project can generate avatars locally using open-source tools. A small Flask
server is provided in `backend/` that now runs the
[PIFuHD](https://github.com/facebookresearch/pifuhd) pipeline to build a 3D
model from a single photo. The server also returns mock measurements but can be
extended with projects like
[SMPL-Anthropometry](https://github.com/sergeyprokudin/smpl-anthropometry) or
[3d-body-measurements](https://github.com/korrair/3d-body-measurements).

Start the server with:

```bash
pip install -r backend/requirements.txt
npm run start:avatar-api
```

#### Digitizing an image into 3D

The backend uses the script `backend/digitize_avatar.py` to run the
[PIFuHD](https://github.com/facebookresearch/pifuhd) pipeline. The
`/generate-avatar` endpoint accepts an uploaded image and returns a reconstructed
GLB file, while `/digitize-avatar` exposes the raw OBJ result. Running this
requires PyTorch and may take several minutes on CPU.

Then set `openAvatarApiUrl` in `src/environments/environment.ts` to the server
URL, e.g. `http://localhost:5000`.

### Default outfits

If no clothing items have been uploaded, the application now loads a set of
placeholder outfit pieces that are embedded directly in the code as base64
data URIs. This ensures the virtual closet and outfit generator still function
during demos without needing any binary assets in the repository.

### Default avatar

When a user does not upload a photo or avatar generation fails, the workflow
continues with a demo avatar located at `src/assets/avatar-default.glb`. This
allows the rest of the application to be explored without providing an image.

## Configuration

Add your API keys in `src/environments/environment.ts`:

```
export const environment = {
  production: false,
  readyPlayerMeApiKey: 'YOUR_READY_PLAYER_ME_API_KEY',
  removeBgApiKey: 'YOUR_REMOVE_BG_API_KEY',
  scanditLicenseKey: 'YOUR_SCANDIT_LICENSE_KEY',
  bodyBlockApiKey: 'YOUR_BODYBLOCK_API_KEY',
  openAvatarApiUrl: '',
  // Fashn.ai virtual try-on configuration
  fashnApiKey: 'YOUR_FASHN_API_KEY',
  fashnApiUrl: 'https://api.fashn.ai/v1',
  // Optional SayMotion REST API configuration
  sayMotionBaseUrl: '',
  sayMotionClientId: '',
  sayMotionClientSecret: '',
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

### Virtual try-on with Fashn.ai

Add your Fashn API key and base URL to the environment configuration as shown above. The provided `FashnService` wraps the `/run` and `/status` endpoints and polls until the job completes.

```ts
import { FashnService } from './services/fashn.service';

constructor(private fashn: FashnService) {}

async preview() {
  const result = await this.fashn.tryOn('model.jpg', 'garment.jpg', 'tops');
  console.log(result);
}
```

Deploying to Firebase requires a valid Firebase project configuration. Ensure `firebase.json` has `"public": "dist/ucloset3d"` to match the Angular build output.

## Authentication

The login screen uses Firebase Authentication with email and password credentials. You can create an account using the new **Sign Up** page at `/signup` and then sign in with those credentials. Upon success you will be taken to the photo upload page.

The UI provides the following pages:
1. **Upload Photo** – process an image with background removal. Drag and drop or select a file to begin.
2. **Avatar Preview** – display the generated avatar with an option to continue.
3. **Avatar View** – preview the generated avatar.
4. **Mix & Match** – list outfit items in a simple mix and match interface.
5. **Virtual Closet** – style an avatar with draggable outfit pieces.
6. **Motion Generator** – create animations from a text prompt using the SayMotion API.
7. **Metahuman Video** – upload a video and generate a MetaHuman animation via the SayMotion API.

## Six-Screen Workflow

1. **Login** – authenticate with a demo account.
2. **Avatar Generation** – create a personalized avatar using either Ready Player Me or the optional open-source pipeline and collect measurements.
3. **Outfit Uploads** – add clothing images with drag-and-drop support and automatically remove the background.
4. **Virtual Closet** – manage wardrobe items with drag‑and‑drop sorting.
5. **Mix & Match** – arrange outfits using pieces from the virtual closet.
6. **Motion Generator** – convert text prompts into animations.
7. **Gallery Sharing** – publish completed looks to a shareable gallery page.
8. **Metahuman Video** – animate a MetaHuman from an uploaded video.

## Default outfits

Example outfit images are stored inline as base64 data URIs in
`src/app/models/default-outfits.ts`. This avoids keeping `.png` files in
`src/assets/outfits`.

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

## Running on iOS and Android

This project can be packaged as a native mobile application using [Capacitor](https://capacitorjs.com/).

1. Install the Capacitor CLI:
   ```bash
   npm install
   ```
2. Initialize Capacitor (only once):
   ```bash
   npx cap init ucloset3d com.example.ucloset3d
   ```
3. Add the platforms:
   ```bash
   npx cap add ios
   npx cap add android
   ```
4. Build the Angular project and copy the files:
   ```bash
   npm run build
   npx cap copy
   ```
5. Open the native IDE to run the app on a device or simulator:
   ```bash
   npx cap open ios    # for Xcode
   npx cap open android  # for Android Studio
   ```

The generated `ios/` and `android/` folders are ignored by Git and can be rebuilt at any time using the commands above.

