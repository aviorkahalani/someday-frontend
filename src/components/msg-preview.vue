<template>
    <section class="msg-preview">
        <div class="msg-header">
            <avatar
                class="person-preview-avatar"
                :username="update.createdBy.fullname"
                :inline="true"
                :size="40"
                :src="imgUrl"
            />
            {{ update.createdBy.fullname }}
        </div>
        <div class="msg-body">
            <div class="msg-txt">{{ update.content.txt }}</div>
        </div>

        <div class="msg-footer">
            <button @click="addLike"><i class="far fa-thumbs-up"></i> Like</button>
            <button @click="deleteUpdate"><i class="far fa-trash-alt"></i> delete</button>
        </div>
    </section>
</template>

<script>
import Avatar from 'vue-avatar';

export default {
    props: {
        update: {
            type: Object,
            required: true,
        },
    },
    methods: {
        async addLike() {
            await this.$store.dispatch({
                type: 'toggleUpdateLike',
                id: this.update.id,
            });
        },
        async deleteUpdate() {
            await this.$store.dispatch({
                type: 'removeUpdate',
                updateId: this.update.id,
            });
        },
        imgUrlToLike(user) {
            return user.imgUrl || '';
        },
    },
    computed: {
        imgUrl() {
            return this.update.createdBy.imgUrl || '';
        },
    },
    components: { Avatar },
};
</script>
