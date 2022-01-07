<template>
  <section class="board-details">
    <template v-if="board">
      <board-header
        v-if="board"
        :board="board"
        @addNewGroup="addNewGroup"
        @updateTitles="updateTitles"
        @setFilter="setFilter"
      />
      <group-list
        v-if="board"
        :groups="board.groups"
        @updateGroupName="updateGroupName"
        @removeGroup="removeGroup"
        @duplicateGroup="duplicateGroup"
        @changeColor="changeColor"
        @updateDrag="updateDrag"
        @openTaskDetails="openTaskDetails"
      />
      <router-view />
    </template>

    <div class="loader" v-else>
      <img src="@/assets/img/loader.gif" alt="" />
    </div>
  </section>
</template>

<script>
import { socketService } from '@/services/socket.service.js'
import boardHeader from '../components/board-header.vue'
import groupList from '../components/group-list.vue'

export default {
  computed: {
    board() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoardFiltered))
    },
  },
  async created() {
    await this.loadBoard()
    await socketService.setup()
    socketService.emit('in-board', this.board._id)
    socketService.on('board-updated', this.updateBoard)
  },
  destroyed() {
    socketService.emit('left-board', this.board._id)
    socketService.on('board-updated')
  },

  methods: {
    updateBoard(board) {
      this.$store.commit({ type: 'loadBoard', board })
    },
    async loadBoard() {
      try {
        const { boardId } = this.$route.params
        return await this.$store.dispatch({ type: 'loadBoard', boardId })
      } catch (error) {
        console.error('Couldnt load board')
      }
    },
    async updateDrag(updatedGroups) {
      try {
        await this.$store.dispatch({ type: 'saveGroups', updatedGroups })
      } catch (err) {
        console.log('Couldnt updated the order of the groups', err)
      }
    },
    async updateTitles(board) {
      try {
        await this.$store.dispatch({ type: 'saveBoard', board })
      } catch (err) {
        console.log('Couldnt updated the titles', err)
      }
    },

    async addNewGroup() {
      try {
        await this.$store.dispatch({ type: 'addNewGroup' })
      } catch (err) {
        console.log('Couldnt Added the new Group', err)
      }
    },
    async updateGroupName(updatedGroup) {
      try {
        await this.$store.dispatch({ type: 'updateGroupName', updatedGroup })
      } catch (err) {
        console.log('Couldnt updated the name of the group', err)
      }
    },
    async removeGroup(group) {
      try {
        await this.$store.dispatch({ type: 'removeGroup', group })
      } catch (err) {
        console.log('Couldnt remove the group', err)
      }
    },
    async duplicateGroup(duplicatedGroup) {
      try {
        await this.$store.dispatch({
          type: 'duplicateGroup',
          duplicatedGroup,
        })
      } catch (err) {
        console.log('Couldnt duplicate the group', err)
      }
    },
    async changeColor(group) {
      try {
        await this.$store.dispatch({ type: 'updateGroup', group })
      } catch (err) {
        console.log('Couldnt change the color of the group', err)
      }
    },
    openTaskDetails(taskId) {
      const board = this.$store.getters.currBoard
      this.$router.push(`/board/${board._id}/task/${taskId}`)
    },
    setFilter(filterBy) {
      this.$store.commit({ type: 'setFilter', filterBy })
    },
  },
  watch: {
    '$route.params.boardId': {
      async handler() {
        await socketService.emit('left-board', this.board._id)
        this.loadBoard()
        socketService.emit('in-board', this.$route.params.boardId)
      },
    },
  },

  components: {
    boardHeader,
    groupList,
  },
}
</script>
