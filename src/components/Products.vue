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
          <center>
            <Pagination/>
          </center>
          <hr/>
          <Items />
          <hr/>
          <center>
            <Pagination/>
          </center>
          <hr/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>

import Items from '@/components/Items'
import FilterList from '@/components/FilterList'
import Pagination from '@/components/Pagination'

export default {
  name: 'products',
  components: {Items, FilterList, Pagination}
}
</script>
