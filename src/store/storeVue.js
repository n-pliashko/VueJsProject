const getSearchString = (filter, withSign = true) => {
  let params = [];
  for (let key in filter) {
    let values = Array.isArray(filter[key]) ? filter[key].join(',') : filter[key];
    if (values.length !== 0)
      params.push(key + '=' + values);
  }
  return (params.length > 0 ? (withSign ? '?' : '' ) + params.join('&') : '');
}

const parseQueryString = queryString => {
  let params = {}, queries, temp, i, l;
  queries = queryString.split("&");
  for (i = 0, l = queries.length; i < l; i++) {
    temp = queries[i].split('=');
    if (temp.length > 1) {
      params[temp[0]] = [];
      temp[1].split(',').forEach(val => {
        params[temp[0]].push(val.trim());
      });
    }
  }
  return params;
}

const storeVue = {
  data () {
    return {
      items: {
        data: [],
        total: 0,
        priceFrom: '',
        priceTo: ''
      },
      pagination: {
        skip: 0,
        limit: 60
      },
      filters: {
        price_from: '',
        price_to: '',
      },
      navigation: {
        location: window.location.href,
        protocol: window.location.protocol,
        host: window.location.host,
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      },
      search: {
        query: '',
        params: {}
      },
      filtersList: []
    }
  },
  mounted() {
    this.$on('loadFilters', this.loadComponents);
    this.$on('loadItems', this.loadComponents);
    this.$on('changeNavigation', this.changeNavigation);

    let emit = true;
    let _search = this.navigation.search.replace(/^\?/, '')
    if (!this.isHhistoryApiAvailable) {
      _search = this.navigation.hash.replace(/^#/, '')
    }

    if (_search.length > 0) {
      let params = parseQueryString(_search);
      if (Object.keys(params).indexOf('q') !== -1) {
        this.search.query = params.q.length > 0 ? '?q=' + params.q.join(', ') : '';
        this.search.params = {q: params.q.join(',')};
        delete params.q;
      }
      Object.keys(params).map(key => {
          if (Object.keys(this.filters).indexOf(key) === -1)
            this.$set(this.filters, key, params[key]);
          else
            this.filters[key] = params[key];
      });
      emit = false;
    }
    if (emit) {
      this.$emit('loadFilters', 1);
      this.$emit('loadItems', 0, 1);
    }
  },
  computed: {
    isHhistoryApiAvailable : function() {
      return !!(window.history && window.history.pushState);
    }
  },
  methods: {
    loadComponents: function(onlyFilters = 0, onlyItems = 0) {
      let self = this;
      let data = {
        skip: self.pagination.skip,
        limit: self.pagination.limit,
        onlyFilters: onlyFilters,
        onlyItems: onlyItems
      };
      Object.assign(data, self.filters);
      if (self.search.params['q'] && self.search.params['q'].length > 0)
        Object.assign(data, {q: self.search.params['q']})

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
            if (json.filters) {
              json.filters.map(key => {
                if (Object.keys(self.filters).indexOf(key) === -1)
                  self.$set(self.filters, key, []);
              });
            }
            if (json.categories)
              self.filtersList = json.categories;
            if (json.items) {
              self.items.data = json.items.items;
              self.items.total = json.items.total;
              self.items.priceFrom = parseFloat(json.items.min_price).toFixed(2);
              self.items.priceTo = parseFloat(json.items.max_price).toFixed(2);
            }
          }
        );
    },
    changeNavigation: function() {
      let self = this;
      let _hash = self.navigation.hash;
      let _search = getSearchString(self.filters);
      let sign = _search.length > 0 ? '&' : '?';
      let _search_q = getSearchString(self.search.params, false);
      _search += _search_q.length > 0 ? sign + _search_q : '';
      let location = self.navigation.protocol + '//' + self.navigation.host + self.navigation.pathname;

      if (self.isHhistoryApiAvailable) {
        location += _search + _hash;
        window.history.pushState({}, null, location);
      } else {
        _hash = '#' + _search.replace(/^\?/, '');
        _search = self.navigation.search;
        location += _search;
        window.location.hash = _hash;
      }

      self.navigation.location = location;
      self.navigation.search = _search;
      self.navigation.hash = _hash;
    }
  },
  watch: {
    search: {
      handler: function() {
        this.$emit('changeNavigation');
        this.$emit('loadFilters', 1);
        this.$emit('loadItems', 0, 1);
        } ,
      deep: true
    },
    pagination: {
      handler: function() {
        this.$emit('loadItems', 0, 1);
      } ,
      deep: true
    },
    filters: {
      handler: function () {
        this.$emit('changeNavigation');
        this.$emit('loadFilters', 1);
        this.$emit('loadItems', 0, 1);
      },
      deep: true
    }
  }
}

export default storeVue
