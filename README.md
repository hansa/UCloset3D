# UCloset3D

This is a demo Angular application for experimenting with a virtual closet experience. It includes placeholder integrations for external services such as Ready Player Me, Remove.bg and Firebase.

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

Deploying to Firebase requires a valid Firebase project configuration. Ensure `firebase.json` has `"public": "dist/ucloset3d"` to match the Angular build output.


The UI provides four main pages:

1. **Upload Photo** – process an image with background removal.
2. **Avatar View** – preview a sample 3D avatar.
3. **Mix & Match** – list outfit items in a simple mix and match interface.
4. **Virtual Closet** – style an avatar with draggable outfit pieces.
The UI provides the following pages:
1. **Upload Photo** – process an image with background removal.
2. **Avatar Preview** – display the generated avatar with an option to continue.
3. **Avatar View** – preview a sample 3D avatar.
4. **Mix & Match** – list outfit items in a simple mix and match interface.

## Six-Screen Workflow

1. **Login** – authenticate with a demo account.
2. **Avatar Generation** – create a personalized 3D avatar from a selfie.
3. **Outfit Uploads** – add clothing images and automatically remove the background.
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

