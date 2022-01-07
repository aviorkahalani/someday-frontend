<template>
  <el-date-picker
    class="date-column"
    v-model="newDate"
    @change="onDateChange"
    type="date"
    size="mini"
    placeholder="Pick a Date"
    format="dd/MM/yyyy"
    value-format="timestamp"
  >
  </el-date-picker>
</template>

<script>
export default {
  props: {
    value: {
      // type: Number,
      // required: true,
    },
    board: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newDate: null,
    }
  },
  computed: {
    hasDate() {
      return !!this.value
    },
  },
  methods: {
    onDateChange() {
      // const date = new Date(this.newDate);

      this.$emit('input', this.newDate)
    },
  },
  created() {
    if (this.value) this.newDate = this.value
  },
  watch: {
    value(newVal) {
      this.newDate = newVal
    },
  },
}
</script>
