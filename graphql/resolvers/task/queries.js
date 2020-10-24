import { Task } from '@db/models';

const taskQueries = {
  tasks: async (_, { params = { page: 1, pageSize: 100 } }) => {
    const query = { deleted: false };
    const { page, pageSize } = params;

    const [results, count] = await Promise.all([
      Task.find(query)
        .skip(pageSize * (page - 1))
        .limit(pageSize),
      Task.countDocuments(query),
    ]);

    return {
      results,
      count,
      params,
    };
  },
  task: (_, { id }) => Task.findById(id),
};

export default taskQueries;
