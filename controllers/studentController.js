const Student = require('../models/studentModel');

exports.getStudents = async (req, res) => {
    const Students = await Student.find();
    res.status(200).json(Students);
};

exports.getStudentByID = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student)
            return res.status(404).json({
                message: "student not found"
            });
        res.json(student);
    }
    catch {
        res.status(400).json({
            message: "Invalid ID get"
        });
    }
};

exports.addStudent = async (req, res) => {
    try {
        const { name, email, course, fees } = req.body;
        const student = new Student({
            name,
            email,
            course,
            fees
        });
        await student.save();
        res.status(200).json(student);
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }


}
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, course, fees } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { name, email, course, fees },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);
        if (!student)
            return res.status(404).json({ message: "Not Found ID" })
        res.json({ message: "Deleted" });

    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }

}

