<template>
<div>
    <h2 style="text-align: center;">Shopping Cart</h2>
    <table>
      <tbody style="vertical-align: top">
      <tr>
        <td>
          <FilterList></FilterList>
        </td>
        <td>
          <hr/>
          <Items></Items>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>

import Items from '@/components/Items'
import FilterList from '@/components/FilterList'

export default {
  name: 'products',
  components: {Items, FilterList}
}
</script>
