export default {
  name: 'filters',
  props: ['title', 'filterName', 'onlyOne', 'categories'],
  methods: {
    clearAll: function() {
      this.$root.filters[this.filterName] = []
    }
  }
}
