# UCloset3D

This is a demo Angular application for experimenting with a virtual closet experience. It includes placeholder integrations for external services such as Ready Player Me, Remove.bg and Firebase.

The UI provides three main pages:
1. **Upload Photo** – process an image with background removal.
2. **Avatar View** – preview a sample 3D avatar.
3. **Mix & Match** – list outfit items in a simple mix and match interface.

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

Deploying to Firebase requires a valid Firebase project configuration.

Ensure `firebase.json` has `"public": "dist/ucloset3d"` to match the Angular build output.

