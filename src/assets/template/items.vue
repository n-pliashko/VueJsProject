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
