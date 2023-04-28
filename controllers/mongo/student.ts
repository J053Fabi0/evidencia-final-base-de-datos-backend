import Student from "../../models/student.model.ts";

export const getStudents = Student.find.bind(Student);
export const getStudent = Student.findOne.bind(Student);
export const createStudent = Student.create.bind(Student);
export const changeStudent = Student.updateOne.bind(Student);
export const changeStudents = Student.updateMany.bind(Student);
export const deleteStudents = Student.deleteMany.bind(Student);
export const deleteOneStudent = Student.deleteOne.bind(Student);
export const countStudents = Student.countDocuments.bind(Student);
export const findAndDeleteStudent = Student.findOneAndDelete.bind(Student);
