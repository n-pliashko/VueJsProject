<template>
  <div id="refinePanel" class="show-for-medium boxShadow refine_column">
    <div class="refine-control-header-top">
      <span class="headTitle">Refine By</span>
      <span class="clearLink">
          <a class="clear_all_filters white_ul" style="display: inline" v-on:click="clearAllFilters()">Clear all filters</a>
        </span>
    </div>
    <div class="show-for-medium boxShadow refine_column">
      <div id="categories">
        <div class="price_slider_wrapper">
          <div class="refine-control-header show-for-medium">
            <span class="headTitle">Price (£)</span>
          </div>

          <div class="slider_div" data-slider_name="price">
            <input name="priceFrom" class="slider_range price_range price_range_min"
                   :value="_priceFrom"
                   v-on:input="handleInput('priceFrom', $event.target.value)"
                   v-on:blur="changePrice"/> &nbsp; - &nbsp;
            <input name="priceTo"  class="slider_range price_range price_range_max"
                   :value="_priceTo"
                   v-on:input="handleInput('priceTo', $event.target.value)"
                   v-on:blur="changePrice"/>
          </div>
        </div>
        <hr style="margin: 0"/>
        <Filters v-for="filter in $root.categories" :key="filter.name" :title="filter.title" :categories="filter.value" :filterName="filter.name" :onlyOne="filter.onlyOne ? filter.onlyOne : false" ></Filters>
      </div>
    </div>
  </div>
</template>

<script src="../assets/scripts/filterList.js"></script>
