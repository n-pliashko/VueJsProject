<template>
  <div>
    <button class="button red"  :disabled="$root.skip > 0 ? '' : 'disabled'">
    PREVIOUS
    </button>
    <button class="button red" :disabled="parseInt($root.skip) + parseInt($root.limit) < $root.total ? '' : 'disabled'">
    NEXT
    </button>
    <b style="text-align: center; line-height: 1">[{{$root.total}}]</b>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    data() {
      return {
        skip: this.$root.pagination.skip,
        limit: this.$root.pagination.limit,
        total: this.$root.total
      }
    }
  }
</script>
