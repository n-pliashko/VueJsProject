export default {
  name: 'items',
  mounted() {
    let self = this;
    let data = {
      skip: self.$root.pagination.skip,
      limit: self.$root.pagination.limit,
      onlyItems: 1
    }

    let form = new FormData();
    Object.keys(data).map(key => (
      form.append(key, data[key])
    ))

    let dataRequest = {
      method: 'POST',
      headers: new Headers({
        'X-Requested-With': 'XMLHttpRequest'
      }),
      body: form
    }
    fetch('http://ssyii/web/site/catalogue_search', dataRequest).then(response => response.json())
      .then(json => {
          self.$root.items = json.items
          self.$root.total = json.total
        }
      ).catch(() => {
      return self.$root.items = []
      self.$root.total =  0
    })
  }
}
