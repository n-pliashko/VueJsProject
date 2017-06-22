export default {
  name: 'pagination',
  computed: {
    disabledNext: function () {
      return this.$root.pagination.skip + this.$root.pagination.limit > this.$root.items.total
    },
    disabledPrevious: function () {
      return this.$root.pagination.skip == 0
    }
  },
  methods: {
    loadNext: function () {
      this.$root.pagination.skip += this.$root.pagination.limit
    },
    loadPrevious: function () {
      this.$root.pagination.skip -= this.$root.pagination.limit
    }
  }
}
