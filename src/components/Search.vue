<template>
  <div>
    <form style="float: right; max-width: 200px;">
    <div class="form-group">
      <input type="text" id="search_input" placeholder="Input search text" :value="_searchText" v-on:input="handleInput($event.target.value)"/>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-default" style="display: inline-block" v-on:click="handleSubmit($event)">Search</button>
    </div>
    </form>
  </div>
</template>

<script src="../assets/scripts/search.js"></script>
