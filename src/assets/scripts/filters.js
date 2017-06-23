export default {
  name: 'filters',
  props: ['title', 'filterName', 'onlyOne', 'categories'],
  mounted() {
    if (typeof this.$root.filters[this.filterName] === 'object' && !!this.onlyOne && this.$root.filters[this.filterName].length > 0)
      this.$root.filters[this.filterName] = this.$root.filters[this.filterName][0];
  },
  methods: {
    clearAll: function() {
      this.$root.filters[this.filterName] = []
    }
  }
}
