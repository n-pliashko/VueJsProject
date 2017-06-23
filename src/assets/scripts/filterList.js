import Filters from '@/components/Filters'

export default {
  name: 'filter_list',
  components: {Filters},
  data() {
    return {
      priceTo: '',
      priceFrom: ''
    }
  },
  computed: {
    _priceFrom: function() {
      return this.$root.filters.price_from.length > 0 ? this.$root.filters.price_from : this.$root.items.priceFrom;
    },
    _priceTo: function() {
      return this.$root.filters.price_to.length > 0 ? this.$root.filters.price_to : this.$root.items.priceTo;
    }
  },
  methods: {
    clearAllFilters: function() {
      Object.keys(this.$root.filters).map(key => {
        this.$root.filters[key] = [];
      });
    },
    changePrice: function() {
      let _price = {
        price_from : this.priceFrom.length > 0 ? this.priceFrom : this._priceFrom,
        price_to : this.priceTo.length > 0 ? this.priceTo : this._priceTo
      };
      Object.assign(this.$root.filters, _price);
    },
    handleInput: function(name, value) {
      this[name] = value;
    }
  }
}
