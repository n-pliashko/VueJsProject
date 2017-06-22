import Filters from '@/components/Filters'

export default {
  name: 'filter_list',
  components: {Filters},
  data() {
    return {
      categories: [],
      designers: [],
      priceTo: '',
      priceFrom: this.$root.filters.price_from.length > 0 ? this.$root.filters.price_from : this.$root.items.priceFrom
    }
  },
  computed: {
    filters: function () {
      return this.$root.filters;
    }
  },
  mounted() {
    this.$on('loadCategories', this.loadCategories);
    this.$emit('loadCategories');

    this.priceFrom = this.$root.filters.price_from.length > 0 ? this.$root.filters.price_from : this.$root.items.priceFrom;
    this.priceTo = this.$root.filters.price_to.length > 0 ? this.$root.filters.price_to : this.$root.items.priceTo;
  },
  methods: {
    clearAllFilters: function() {
      this.$root.filters.cats = [];
      this.$root.filters.designers = [];
    },
    loadCategories: function() {
      let self = this;
      let data = {
        skip: self.$root.pagination.skip,
        limit: self.$root.pagination.limit,
        onlyFilters: 1
      };

      if (self.$root.search.params['q'] && self.$root.search.params['q'].length > 0)
        Object.assign(data, {q: self.$root.search.params['q']})

      Object.assign(data, self.$root.filters);

      let form = new FormData();
      Object.keys(data).map(key => (
        form.append(key, data[key])
      ));

      let dataRequest = {
        method: 'POST',
        headers: new Headers({
          'X-Requested-With': 'XMLHttpRequest'
        }),
        body: form
      };
      fetch('http://ssyii/web/site/catalogue_search', dataRequest).then(response => response.json())
        .then(json => {
            self.categories = json.categories
            self.designers = json.designers
          }
        ).catch(() => {
        {
          self.designers = []
          self.categories = []
        }
      });
    },
    changePrice: function() {
      this.$root.filters.price_from = this.priceFrom;
      this.$root.filters.price_to = this.priceTo;
    }
  },
  watch: {
    filters: {
      handler: function () {
        this.$emit('loadCategories');
      },
      deep: true
    }
  }
}
