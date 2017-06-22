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
                <input name="price_from" class="slider_range price_range price_range_min" v-model="priceFrom" v-on:blur="changePrice"/> &nbsp; - &nbsp;
                <input name="price_to"  class="slider_range price_range price_range_max" v-model="priceTo" v-on:blur="changePrice"/>
              </div>
            </div>
            <hr style="margin: 0"/>
            <Filters title="CATEGORIES" :categories="categories" filterName="cats"      onlyOne="1" ></Filters>
            <Filters title="DESIGNERS"  :categories="designers"  filterName="designers" onlyOne="0"></Filters>
          </div>
        </div>
      </div>
</template>

<script src="../assets/scripts/filterList.js"></script>
