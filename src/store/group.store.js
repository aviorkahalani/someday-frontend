import { utilService } from '@/services/util.service.js';
import { boardService } from '@/services/board.service.js';

export const groupStore = {
    strict: true,
    actions: {
        async updateGroupName(context, { updatedGroup }) {
            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((group) => group.id === updatedGroup.id);
            boardCopy.groups.splice(groupIdx, 1, updatedGroup);

            try {
                context.dispatch({ type: 'saveBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => updateTask failed\n', err);
            }
        },
        async removeGroup(context, { group }) {
            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((grp) => grp.id === group.id);
            boardCopy.groups.splice(groupIdx, 1);

            try {
                context.dispatch({ type: 'saveBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
        },
        async duplicateGroup(context, { duplicatedGroup }) {
            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((group) => group.id === duplicatedGroup.id);
            duplicatedGroup.id = utilService.makeId();
            duplicatedGroup.title = `Copy of ${duplicatedGroup.title}`;
            boardCopy.groups.splice(groupIdx + 1, 0, duplicatedGroup);

            try {
                context.dispatch({ type: 'saveBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
        },
        async updateGroup(context, { group }) {
            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const groupIdx = boardCopy.groups.findIndex((grp) => grp.id === group.id);
            boardCopy.groups.splice(groupIdx, 1, group);

            try {
                context.dispatch({ type: 'saveBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => updateTask failed\n', err);
            }
        },
        async addNewGroup(context) {
            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            const group = boardService.getEmptyGroup();
            boardCopy.groups.push(group);

            try {
                context.dispatch({ type: 'saveBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
        },

        async saveGroups(context, { updatedGroups }) {
            let boardCopy = JSON.parse(JSON.stringify(context.getters.currBoard));
            boardCopy.groups = updatedGroups;

            try {
                context.dispatch({ type: 'saveBoard', board: boardCopy });
            } catch (err) {
                console.log('Error in taskStore => addTask failed\n', err);
            }
        },
    },
};
