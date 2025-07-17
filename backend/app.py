from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil, os
from ssh_utils import create_sftp_connection
from backup_utils import create_archive, encrypt_file, decrypt_file, generate_key

app = FastAPI(title="Backup Client API")

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return {"msg": "Backend online!"}

class BackupRequest(BaseModel):
    host: str
    port: int
    username: str
    password: str
    remote_dir: str
    local_dir: str
    encrypt: bool = True

@app.post("/backup")
def run_backup(data: BackupRequest):
    # Cria arquivo tar.gz
    archive = create_archive(data.local_dir)
    file_to_send = archive

    # Criptografa se necessário
    if data.encrypt:
        key = generate_key()
        enc_file = encrypt_file(archive, key)
        file_to_send = enc_file

    # Conecta ao servidor SSH
    sftp, transport = create_sftp_connection(data.host, data.port, data.username, data.password)
    try:
        try:
            sftp.stat(data.remote_dir)
        except FileNotFoundError:
            sftp.mkdir(data.remote_dir)

        remote_path = f"{data.remote_dir}/{os.path.basename(file_to_send)}"
        sftp.put(file_to_send, remote_path)
    finally:
        sftp.close()
        transport.close()

    return {"msg": "Backup enviado com sucesso!", "file": os.path.basename(file_to_send)}

@app.post("/restore")
def restore_backup(
    host: str = Form(...),
    port: int = Form(...),
    username: str = Form(...),
    password: str = Form(...),
    remote_file: str = Form(...),
    output_dir: str = Form(...),
    key: str = Form(...)
):
    # Baixa o arquivo do servidor
    sftp, transport = create_sftp_connection(host, port, username, password)
    tmp_file = os.path.join("/tmp", os.path.basename(remote_file))
    sftp.get(remote_file, tmp_file)
    sftp.close()
    transport.close()

    # Descriptografa
    decrypted_path = tmp_file.replace(".enc", "")
    decrypt_file(tmp_file, key.encode(), decrypted_path)

    # Extrai o tar.gz
    shutil.unpack_archive(decrypted_path, output_dir)

    return {"msg": "Restauração concluída", "output": output_dir}
