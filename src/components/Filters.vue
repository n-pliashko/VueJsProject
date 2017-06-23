<template>
  <div>
  <div v-if="categories && $root.filters[filterName]">
    <div class="refine-control-header">
      <span class="headTitle"><a>{{title}}</a></span>
      <span class="subClearLink">
          <a class="highlight clear_section toggleControl closed"
             :style="$root.filters[filterName].length !== 0 ? 'display: block' : 'display:none'" v-on:click="clearAll">Clear</a>
        </span>
    </div>
    <ul class="refine-control" id="scroll_250" >
      <li v-for="cat in categories" :class="[!!cat.is_active ? '' : 'disactive']">
        <a :id="filterName + cat.id" class="search_element ellipsis enabled">
          <input v-if="onlyOne == 0" type="checkbox"
                 :name="filterName"
                 :value="cat.id"
                 :id="'input-' + filterName + cat.id"
                 v-model="$root.filters[filterName]"
          />
          <input v-else type="radio"
                 :name="filterName"
                 :value="cat.id"
                 :id="'input-' + filterName + cat.id"
                 v-model="$root.filters[filterName]"
          />
          <label :for="'input-' + filterName + cat.id" style="cursor:pointer">
            {{cat.name}}
            <span class="refine_column_count">{{cat.count_items >0 ? '(' + cat.count_items + ')' : ''}}</span>
          </label>
        </a>
      </li>
    </ul>
  </div>
  </div>
</template>

<script src="../assets/scripts/filters.js"></script>

<style>
  .disactive {
    pointer-events:none;
    opacity:0.6
  }
</style>
