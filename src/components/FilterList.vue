<template>
 <div id="refinePanel" class="show-for-medium boxShadow refine_column">
        <div class="refine-control-header-top">
          <span class="headTitle">Refine By</span>
          <span class="clearLink">
          <a class="clear_all_filters white_ul" style="display: inline" >Clear all filters</a>
        </span>
        </div>
        <div class="show-for-medium boxShadow refine_column">
          <div id="categories">
            <div class="price_slider_wrapper">
              <div class="refine-control-header show-for-medium">
                <span class="headTitle">Price (£)</span>
                <span class="subClearLink"><a id="clear_price" class="black_ul clear_slider"
                                                  style="display: none">Clear</a></span>
              </div>

              <div class="slider_div" data-slider_name="price">
                <input name="price_from" class="slider_range price_range price_range_min" v-bind:value="priceFrom" /> &nbsp; - &nbsp;
                <input name="price_to"  class="slider_range price_range price_range_max" v-bind:value="priceTo"/>
              </div>
            </div>
            <hr style="margin: 0"/>
            <Filters title="CATEGORIES" :categories="categories" filterName="cats"      onlyOne="1" ></Filters>
            <Filters title="DESIGNERS"  :categories="designers"  filterName="designers" onlyOne="0"></Filters>
          </div>
        </div>
      </div>
</template>

<script>

  import Filters from '@/components/Filters'

  export default {
    name: 'filter_list',
    components: {Filters},
    data() {
      return {
        priceFrom: '',
        priceTo: '',
        title: '',
        filterName: '',
        categories: [],
        designers: []
      }
    },
    mounted() {
      let self = this;
      let data = {
        skip: 0,
        limit: 10,
        onlyFilters: 1
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
            self.categories = json.categories
            self.designers = json.designers
          }
        ).catch(() => {
        {
          self.designers = []
          self.categories = []
        }
      })
    }
  }
</script>
