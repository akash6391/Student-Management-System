from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base

database = "postgresql://postgres:1234@localhost:5432/student_management_system"

engine = create_engine(database)

Sessionlocal = sessionmaker(
    autocommit = False,
    autoflush = False,
    bind = engine
)

Base = declarative_base()