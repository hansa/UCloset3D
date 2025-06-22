# UCloset3D UX Figma Plugin

This folder contains a small Figma plugin that generates a six-screen UX
flow inside a Figma document. Each screen contains a basic wireframe so
you have a visual starting point similar to the mockups referenced in
the chat. The screens are based on the app flow used in this repository:

1. Login
2. Upload Full-Body Photo
3. 3D Avatar Preview + Next
4. Upload Outfits (Skirts, Pants, etc.) + Save
5. Virtual Closet (Drag-and-Drop)
6. Saved Outfits (with Instagram share icon)

## Usage

1. Open Figma and create or open a design file.
2. Go to **Plugins → Development → Import Plugin from Manifest...** and select
   the `manifest.json` file in this folder.
3. Run the plugin from **Plugins → Development → UCloset3D UX Generator**.
   Six frames will be created, one for each screen listed above. The frames
   include placeholder elements such as input fields, avatar circles and
   drag-and-drop slots.

Each frame is 390×844 pixels (phone size). Feel free to modify the generated
elements to match your preferred style.
