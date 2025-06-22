// This Figma plugin creates a six screen UX flow for UCloset3D.
// Each screen contains a very lightweight wireframe so the layout roughly
// matches the mockup shared in chat. The screens are:
// Login, Upload Full-Body Photo, 3D Avatar Preview + Next, Upload Outfits,
// Virtual Closet and Saved Outfits.

function createBaseFrame(name, x) {
  const frame = figma.createFrame();
  frame.name = name;
  frame.resizeWithoutConstraints(390, 844);
  frame.x = x;
  frame.y = 0;
  frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

  const title = figma.createText();
  title.characters = name;
  title.fontSize = 20;
  title.fontName = { family: 'Roboto', style: 'Bold' };
  frame.appendChild(title);
  title.x = 20;
  title.y = 20;
  return frame;
}

function addInput(frame, y, placeholder) {
  const rect = figma.createRectangle();
  rect.resizeWithoutConstraints(350, 40);
  rect.x = 20;
  rect.y = y;
  rect.strokes = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
  rect.fills = [];

  const label = figma.createText();
  label.characters = placeholder;
  label.fontSize = 14;
  label.x = rect.x + 10;
  label.y = rect.y + 10;

  frame.appendChild(rect);
  frame.appendChild(label);
  return rect.y + rect.height + 10;
}

function addButton(frame, y, text) {
  const rect = figma.createRectangle();
  rect.resizeWithoutConstraints(350, 44);
  rect.x = 20;
  rect.y = y;
  rect.cornerRadius = 4;
  rect.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.5, b: 1 } }];
  const label = figma.createText();
  label.characters = text;
  label.fontSize = 16;
  label.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  frame.appendChild(rect);
  frame.appendChild(label);
  label.x = rect.x + 130;
  label.y = rect.y + 12;
  return rect.y + rect.height + 10;
}

function buildLogin(frame) {
  let y = 80;
  y = addInput(frame, y, 'Email');
  y = addInput(frame, y, 'Password');
  addButton(frame, y, 'Login');
}

function buildUploadPhoto(frame) {
  const placeholder = figma.createRectangle();
  placeholder.resizeWithoutConstraints(200, 300);
  placeholder.x = 95;
  placeholder.y = 100;
  placeholder.strokes = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
  placeholder.fills = [];
  const buttonY = placeholder.y + placeholder.height + 20;
  frame.appendChild(placeholder);
  addButton(frame, buttonY, 'Upload Photo');
}

function buildAvatarPreview(frame) {
  const avatar = figma.createEllipse();
  avatar.resizeWithoutConstraints(200, 200);
  avatar.x = 95;
  avatar.y = 120;
  avatar.strokes = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.6 } }];
  avatar.fills = [];
  frame.appendChild(avatar);
  const buttonY = avatar.y + avatar.height + 30;
  addButton(frame, buttonY, 'Next');
}

function buildUploadOutfits(frame) {
  let y = 80;
  for (let i = 0; i < 3; i++) {
    const slot = figma.createRectangle();
    slot.resizeWithoutConstraints(100, 100);
    slot.x = 20 + i * 120;
    slot.y = y;
    slot.strokes = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
    slot.fills = [];
    frame.appendChild(slot);
  }
  addButton(frame, y + 120, 'Save');
}

function buildVirtualCloset(frame) {
  const avatar = figma.createEllipse();
  avatar.resizeWithoutConstraints(160, 160);
  avatar.x = 115;
  avatar.y = 100;
  avatar.strokes = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.6 } }];
  avatar.fills = [];
  frame.appendChild(avatar);
  for (let i = 0; i < 3; i++) {
    const piece = figma.createRectangle();
    piece.resizeWithoutConstraints(60, 60);
    piece.x = 40 + i * 110;
    piece.y = 300;
    piece.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 } }];
    piece.strokes = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
    frame.appendChild(piece);
  }
}

function buildSavedOutfits(frame) {
  let y = 80;
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      const outfit = figma.createRectangle();
      outfit.resizeWithoutConstraints(150, 170);
      outfit.x = 20 + col * 170;
      outfit.y = y + row * 190;
      outfit.strokes = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
      outfit.fills = [];
      const icon = figma.createText();
      icon.characters = '\u{f16d}'; // FontAwesome Instagram glyph as placeholder
      icon.fontSize = 16;
      icon.x = outfit.x + 120;
      icon.y = outfit.y + 140;
      frame.appendChild(outfit);
      frame.appendChild(icon);
    }
  }
}

function createFrame(name, x) {
  const frame = createBaseFrame(name, x);
  switch (name) {
    case 'Login':
      buildLogin(frame);
      break;
    case 'Upload Full-Body Photo':
      buildUploadPhoto(frame);
      break;
    case '3D Avatar Preview + Next':
      buildAvatarPreview(frame);
      break;
    case 'Upload Outfits + Save':
      buildUploadOutfits(frame);
      break;
    case 'Virtual Closet':
      buildVirtualCloset(frame);
      break;
    case 'Saved Outfits (Share)':
      buildSavedOutfits(frame);
      break;
  }
  return frame;
}

async function main() {
  await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Roboto', style: 'Bold' });
  const screens = [
    'Login',
    'Upload Full-Body Photo',
    '3D Avatar Preview + Next',
    'Upload Outfits + Save',
    'Virtual Closet',
    'Saved Outfits (Share)' 
  ];

  let offset = 0;
  const spacing = 40;
  const nodes = [];
  for (const name of screens) {
    const frame = createFrame(name, offset);
    offset += 390 + spacing;
    nodes.push(frame);
  }
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
  figma.closePlugin('6-screen UX created.');
}

main();
