from sqlalchemy import Table, Column, Integer, ForeignKey
from app.database import Base

# for many to many relationship between parent and student
parent_student_link = Table(
    'parent_student_link',
    Base.metadata,
    Column('parent_id', Integer, ForeignKey('parents.id'), primary_key=True),
    Column('student_id', Integer, ForeignKey('students.id'), primary_key=True)
)