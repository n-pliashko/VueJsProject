<template>
<div id="items">
    <div v-for="item in items">
      <div class="large-4 medium-6 small-6 columns resultSpacing productListing" style="margin-bottom: 20px;">
        <div v-bind:id="item.id">
          <div class="productModel ellipsis"> {{item.designer_name}}<br/>{{item.model_name}} - {{item.name}}</div>
          <div class="show-for-medium">
            <div class="productColour ellipsis">{{item.description}}</div>
          </div>
          <div class="show-for-medium">
            <div class="productColour ellipsis">{{item.count_options}} options</div>
          </div>
          <div class="productPrice">
            <span class="now">&#36;{{parseFloat(item.price).toFixed(2)}}</span>
          </div>
        </div>
        <button class="button" v-on:click="onAddToCartClicked(item.id)">
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'items',
  data() {
      return {
      items: []
      }
    },
    mounted() {
      let self = this;
      let data = {
        skip: 0,
        limit: 10,
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
            self.items =  json.items
          }
        ).catch(() => {
        return self.items = []
      })
    }
}
</script>
