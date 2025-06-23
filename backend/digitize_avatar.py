import os
import subprocess
import tempfile

def run_pifuhd(image_path: str, out_dir: str):
    """Run PIFuHD on the given image and save results to out_dir."""
    repo_url = "https://github.com/facebookresearch/pifuhd"
    repo_dir = os.path.join(tempfile.gettempdir(), 'pifuhd')
    if not os.path.exists(repo_dir):
        subprocess.check_call(['git', 'clone', '--depth', '1', repo_url, repo_dir])
    # Download pre-trained weights if not present
    ckpt = os.path.join(repo_dir, 'checkpoints', 'pifuhd.pt')
    if not os.path.exists(ckpt):
        os.makedirs(os.path.dirname(ckpt), exist_ok=True)
        subprocess.check_call([
            'wget', 'https://dl.fbaipublicfiles.com/pifuhd/checkpoints/pifuhd.pt',
            '-O', ckpt
        ])
    script = os.path.join(repo_dir, 'apps', 'simple_test.py')
    subprocess.check_call([
        'python', script,
        '--input_path', image_path,
        '--output_path', out_dir,
        '--loadSize', '512',
        '--load_netMR_checkpoint_path', ckpt,
        '--load_netG_checkpoint_path', ckpt,
    ])

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='Digitize a human from a single image using PIFuHD.')
    parser.add_argument('image', help='Path to input image')
    parser.add_argument('--out', default='output', help='Directory to write OBJ file')
    args = parser.parse_args()

    os.makedirs(args.out, exist_ok=True)
    run_pifuhd(args.image, args.out)
    print(f'Results saved to {args.out}')
