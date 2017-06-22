<template>
<div>
    <h2 style="text-align: center;">Shopping Cart</h2>
    <Search/>
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


<script src="../assets/scripts/products.js"></script>
