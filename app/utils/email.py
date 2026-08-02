from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from pydantic import EmailStr
from dotenv import load_dotenv
import os

load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT")),
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
)
print(conf.MAIL_USERNAME)
print(conf.MAIL_FROM)
async def send_absent_email(
    parent_email: EmailStr,
    student_name: str,
    date: str,
):
    message = MessageSchema(
        subject="Student Attendance Alert",
        recipients=[parent_email],
        body=f"""
Dear Parent,

Your child {student_name} was marked ABSENT.

Date : {date}

Regards,
School Management
""",
        subtype=MessageType.plain,
    )

    fm = FastMail(conf)
    await fm.send_message(message)