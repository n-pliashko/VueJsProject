export default {
  name: 'search',
  data() {
    return {
      searchText: ''
    }
  },
  mounted() {
    let params = this.$root.search.params;
    this.searchText = params.q ? params.q : '';
  },
  methods: {
    handleSubmit: function (e) {
      e.preventDefault();
      const value = this.searchText;
      let keyword = value.replace(/\s{2,}/g, ' ');
      keyword = keyword.replace(/\s/g, "+");
      this.$root.search.query = '?q=' + keyword;
      Object.assign(this.$root.search.params, {q: keyword});
      console.log(this.$root.search, this.$root.filters);
    }
  }
}
