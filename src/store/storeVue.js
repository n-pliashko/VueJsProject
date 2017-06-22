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
      temp[1].split(',').forEach(id => {
        let val = parseInt(id.trim());
        if (!isNaN(val))
          params[temp[0]].push(val);
        else {
          delete  params[temp[0]];
        }

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
        designers: [],
        cats: []
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
      }
    }
  },
  mounted() {
    this.$on('loadItems', this.loadItems);
    this.$on('changeNavigation', this.changeNavigation);

    let emit = true;
    if (this.navigation.search.length > 0) {
      let params = parseQueryString(this.navigation.search);
      if (params['q'] > 0) {
        this.search.query = params['q'] > 0 ? '?q=' + params['q'] : '';
        this.search.params = params;
        emit = false;
      }
    }

    let _search = this.navigation.search.replace(/^\?/, '')
    if (!this.isHhistoryApiAvailable) {
      _search = this.navigation.hash.replace(/^#/, '')
    }

    if (_search.length > 0) {
      Object.assign(this.filters, parseQueryString(_search));
      emit = false;
    }
    if (emit) {
      this.$emit('loadItems');
    }
  },
  computed: {
    isHhistoryApiAvailable : function() {
      return !!(window.history && window.history.pushState);
    }
  },
  methods: {
    loadItems: function() {
      let self = this;
      let data = {
        skip: self.pagination.skip,
        limit: self.pagination.limit,
        onlyItems: 1
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
            self.items.data = json.items
            self.items.total = json.total
            self.items.priceFrom = parseFloat(json.min_price).toFixed(2)
            self.items.priceTo = parseFloat(json.max_price).toFixed(2)
          }
        ).catch(() => {
        self.items.data = []
        self.items.total =  0
        self.items.priceFrom = ''
        self.items.priceTo = ''
      });
    },
    changeNavigation: function() {
      let self = this
      console.log(self.navigation)
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
        this.$emit('loadItems');
        } ,
      deep: true
    },
    pagination: {
      handler: function() {
        this.$emit('loadItems');
      } ,
      deep: true
    },
    filters: {
      handler: function () {
        this.$emit('changeNavigation');
        this.$emit('loadItems')
      },
      deep: true
    }
  }
}

export default storeVue
