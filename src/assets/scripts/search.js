export default {
  name: 'search',
  data() {
    return {
      inputSearchText: ''
    }
  },
  computed: {
    _searchText: function() {
      return this.$root.search.params.q  ? decodeURIComponent(this.$root.search.params.q) : ''
    }
  },
  methods: {
    handleSubmit: function (e) {
      e.preventDefault();
      Object.assign(this.$root.search.params, {q: this.inputSearchText});
    },
    handleInput: function(value) {
      this.inputSearchText = value;
    }
  }
}
