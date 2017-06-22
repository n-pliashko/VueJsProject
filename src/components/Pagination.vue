<template>
  <div>
    <button class="button red"  :disabled="disabledPrevious" v-on:click="loadPrevious">
    PREVIOUS
    </button>
    <button class="button red" :disabled="disabledNext" v-on:click="loadNext">
    NEXT
    </button>
    <b style="text-align: center; line-height: 1">[{{$root.items.total}}]</b>
  </div>
</template>

<script src="../assets/scripts/pagination.js"></script>
