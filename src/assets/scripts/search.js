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
      let params = {
        params: {
          q: this.inputSearchText
        },
        query: '?q=' + this.inputSearchText
      };
      this.$root.search = Object.assign({}, this.$root.search, params);
    },
    handleInput: function(value) {
      this.inputSearchText = value;
    }
  }
}
