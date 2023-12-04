import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    values: [{ type: Number }]
});

const Note = mongoose.model('Note', noteSchema);

export default Note;



export const createNote = async (data) => {
    try {
        const note = new Note({project:data.projectId});
        const result = await note.save();
        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: 'note not created ' + error };
    }
}


export const findNotesByProjectId = async (projectId) => {
    try {
        const notes = await Note.find({ project: projectId })
        if (!notes) {
            return { success: false, message: 'notes not found' };
        }
        return { success: true, data: notes };
    } catch (error) {
        return { success: false, message: 'Error finding notes:' + error };
    }
}


export const addNoteToProjectById = async (projectId,value) => {
    try {
        const note = await  Note.findOne({ project: projectId })
        const updatedNotes =  await Note.findByIdAndUpdate(
            note._id,
            { $push: { values: value } },
            { new: true }
        );
        return { success: true, data: updatedNotes ,  message: 'note added to the project notes  successfully' };
    } catch (error) {
        return { success: false, message: 'Error adding note to the project notes: ' + error };
    }
}