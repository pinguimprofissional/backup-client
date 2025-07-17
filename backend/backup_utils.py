import os, tarfile, tempfile, hashlib
from cryptography.fernet import Fernet
from datetime import datetime

def create_archive(source_dir):
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    archive_name = f"{os.path.basename(source_dir)}_{timestamp}.tar.gz"
    tmp_path = os.path.join(tempfile.gettempdir(), archive_name)
    with tarfile.open(tmp_path, "w:gz") as tar:
        tar.add(source_dir, arcname=os.path.basename(source_dir))
    return tmp_path

def encrypt_file(file_path, key):
    fernet = Fernet(key)
    with open(file_path, 'rb') as f:
        data = f.read()
    encrypted = fernet.encrypt(data)
    enc_file = f"{file_path}.enc"
    with open(enc_file, 'wb') as f:
        f.write(encrypted)
    return enc_file

def decrypt_file(file_path, key, output_path):
    fernet = Fernet(key)
    with open(file_path, 'rb') as f:
        encrypted = f.read()
    decrypted = fernet.decrypt(encrypted)
    with open(output_path, 'wb') as f:
        f.write(decrypted)

def generate_key():
    return Fernet.generate_key()
