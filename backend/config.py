from pydantic import BaseModel

class SSHConfig(BaseModel):
    host: str
    port: int = 23
    username: str
    password: str
    remote_dir: str = "/tmp"
