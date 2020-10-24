import { Task } from '@db/models';

const taskMutations = {
  createTask: (_, { task }) => {
    const newTask = new Task(task);

    return newTask.save();
  },
  updateTask: (_, { id, task }) =>
    Task.findByIdAndUpdate(id, { $set: { ...task } }, { $new: true }),
  deleteTask: async (_, { id }) => {
    await Task.deleteById(id);
    return true;
  },
};

export default taskMutations;
