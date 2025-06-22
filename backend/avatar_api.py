import os
from flask import Flask, request, send_file, jsonify
import numpy as np

app = Flask(__name__)

# Path to a default avatar shipped with the frontend for demo purposes
DEFAULT_AVATAR_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'avatar-default.glb')

@app.route('/generate-avatar', methods=['POST'])
def generate_avatar():
    """Generate a 3D avatar from a user photo using open-source tools.
    This implementation returns a demo avatar file but can be replaced with
    SMPL-based generation.
    """
    if not os.path.exists(DEFAULT_AVATAR_PATH):
        return 'Avatar asset missing', 500
    return send_file(DEFAULT_AVATAR_PATH, mimetype='model/gltf-binary')

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

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
