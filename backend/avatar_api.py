import os
from flask import Flask, request, send_file, jsonify
import tempfile
import subprocess
import numpy as np
import trimesh
from .digitize_avatar import run_pifuhd

app = Flask(__name__)

# Path to a default avatar shipped with the frontend for demo purposes
DEFAULT_AVATAR_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'avatar-default.glb')

@app.route('/generate-avatar', methods=['POST'])
def generate_avatar():
    """Generate a 3D avatar from a user photo using PIFuHD."""
    if 'photo' not in request.files:
        return 'missing image', 400

    photo = request.files['photo']
    with tempfile.TemporaryDirectory() as tmpdir:
        image_path = os.path.join(tmpdir, photo.filename)
        photo.save(image_path)
        output_dir = os.path.join(tmpdir, 'out')
        os.makedirs(output_dir, exist_ok=True)
        try:
            run_pifuhd(image_path, output_dir)
        except subprocess.CalledProcessError as e:
            return f'Processing error: {e}', 500

        for fname in os.listdir(output_dir):
            if fname.endswith('.obj'):
                obj_path = os.path.join(output_dir, fname)
                mesh = trimesh.load(obj_path, process=False)
                glb_data = trimesh.exchange.gltf.export_glb(mesh)
                glb_path = os.path.join(output_dir, 'avatar.glb')
                with open(glb_path, 'wb') as f:
                    f.write(glb_data)
                return send_file(glb_path, mimetype='model/gltf-binary')

    if os.path.exists(DEFAULT_AVATAR_PATH):
        return send_file(DEFAULT_AVATAR_PATH, mimetype='model/gltf-binary')
    return 'Avatar asset missing', 500

@app.route('/measurements', methods=['POST'])
def measurements():
    """Return basic body measurements computed from the user photo.
    Currently returns mock values. Integrate with projects like
    3d-body-measurements for real results.
    """
    rng = np.random.default_rng()
    data = {
        'chest': float(rng.uniform(80, 100)),
        'waist': float(rng.uniform(60, 90)),
        'hip': float(rng.uniform(80, 100))
    }
    return jsonify(data)


@app.route('/digitize-avatar', methods=['POST'])
def digitize_avatar():
    """Digitize a human from an uploaded image using PIFuHD."""
    if 'file' not in request.files:
        return 'missing image', 400
    image_file = request.files['file']
    with tempfile.TemporaryDirectory() as tmpdir:
        image_path = os.path.join(tmpdir, image_file.filename)
        image_file.save(image_path)
        output_dir = os.path.join(tmpdir, 'out')
        os.makedirs(output_dir, exist_ok=True)
        try:
            subprocess.check_call(['python', 'backend/digitize_avatar.py', image_path, '--out', output_dir])
        except subprocess.CalledProcessError as e:
            return f'Processing error: {e}', 500
        # The PIFuHD script outputs an obj file named "*_recon.obj"
        for fname in os.listdir(output_dir):
            if fname.endswith('.obj'):
                return send_file(os.path.join(output_dir, fname), as_attachment=True)
    return 'No output generated', 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
