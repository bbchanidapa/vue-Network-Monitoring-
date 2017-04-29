<template>
<div class="Hello">
 <nav style="background-color:blue;">
    <div class="nav-wrapper">
    <div class="container">
      <a href="#" class="brand-logo">Logo</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </ul>
      </div>
    </div>
  </nav>
  <div class="row">
   <div class="col s2 offset-s1 headbut"><span class="flow-text">This div is 6-columns wide</span></div>
   <div class="col s5 headbut2">This div is 6-columns wide</div>
   <div class="col s3 headbut3">This div is 6-columns wide</div>
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
<style type="text/css">
  .headbut{
    background-color: yellow;
    height: 50vh;
    margin-right: 15px;    
    margin-top: 10px;  
  }
  .headbut2{
    background-color: pink;
    height: 50vh;
    margin-top: 10px;  
    margin-right: 20px;  
  }
  .headbut3{
    background-color: green;
    height: 50vh;
    margin-top: 10px;  
    margin-left: 5px;  
  }
</style>
