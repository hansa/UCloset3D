# UCloset3D

This is a demo Angular application for experimenting with a virtual closet experience. It includes placeholder integrations for external services such as Ready Player Me, Remove.bg and Firebase.

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

Deploying to Firebase requires a valid Firebase project configuration.
Ensure `firebase.json` has `"public": "dist/ucloset3d"` to match the Angular build output.
