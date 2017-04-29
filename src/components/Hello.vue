<template>
  <div class="hello">
      <div class="row dashboard">
      <div class="col s3 dashboard-height dashboard-firstcolumn" style="">1</div>
      <div class="col s4 dashboard-height" style="background-color:green;">2</div>
      <div class="col s3 dashboard-height" style="background-color:yellow;">3</div>
      </div>
  </div>
</template>
<script>
/*eslint-disable */
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  method: {
    add(){

    }
  }
}
</script>
<style>
  .dashboard {
    height: 50%;
  }
  .hello {
    height: calc(100vh - 20%);
  }
  .dashboard-height {
    height: 100%;
  }
  .dashboard-firstcolumn {
    background-color:gold;
    margin-left: 10px;
    margin-right: 10px;
  }
 
</style>

