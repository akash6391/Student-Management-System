from pydantic_settings import BaseSettings
from pydantic import BaseModel

class Settings(BaseSettings):
    MAIL_USERNAME : str
    MAIL_PASSWORD :str
    MAIL_FROM : str
    MAIL_PORT : int
    MAIL_SERVER : str
    MAIL_FROM_NAME : str

    class config:
        env_file =".env"

setting = Settings()        

class AbsentMail:
    parent_email: str
    parent_name: str
    student_name: str
    attendance_date: str
