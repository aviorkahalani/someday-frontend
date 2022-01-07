export const taskStore = {
    strict: true,
    actions: {
        async updateTask(context, { task, groupId }) {
            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((group) => group.id === groupId);
            const taskIdx = boardCopy.groups[groupIdx].tasks.findIndex((tsk) => tsk.id === task.id);
            boardCopy.groups[groupIdx].tasks.splice(taskIdx, 1, task);

            try {
                context.dispatch({ type: 'saveBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => updateTask failed\n', err);
            }
        },
        async addTask(context, { task, groupId }) {
            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((group) => group.id === groupId);
            boardCopy.groups[groupIdx].tasks.push(task);

            try {
                context.dispatch({ type: 'saveBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
        },
        async duplicateTask(context, { task, taskCopy, groupId }) {
            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((group) => group.id === groupId);
            const taskIdx = boardCopy.groups[groupIdx].tasks.findIndex((tsk) => tsk.id === task.id);
            boardCopy.groups[groupIdx].tasks.splice(taskIdx + 1, 0, taskCopy);

            try {
                context.dispatch({ type: 'saveBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
        },
        async removeTask(context, { task, groupId }) {
            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((group) => group.id === groupId);
            const taskIdx = boardCopy.groups[groupIdx].tasks.findIndex((tsk) => tsk.id === task.id);
            boardCopy.groups[groupIdx].tasks.splice(taskIdx, 1);

            try {
                context.dispatch({ type: 'saveBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
        },
        async saveTasks(context, { tasks, groupId }) {
            let boardCopy = context.getters.currBoard;

            try {
                context.commit({ type: 'changeTasks', tasks, groupId, board: boardCopy });
                context.dispatch({ type: 'saveBoard', board: context.getters.currBoard });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
        },
    },
    mutations: {
        changeTasks(state, { tasks, groupId, board }) {
            const groupIdx = board.groups.findIndex((group) => {
                return group.id === groupId;
            });

            board.groups[groupIdx].tasks = tasks;
        },
    },
    getters: {},
};
