<template>
 <div >
 
  	<p class="redfont">{{msg}}</p>
  	
    	<div class="centre" style="background-color:green;"><center>{{name}}</center>
          <center><img src="http://www.ryc.cl/carro/files/1165970.jpg" width="90%"></center>
    	</div>
    	<div class="bottom" style="background-color:gold;">Graph</div>
   
  
 </div>
</template>
<script>
/*eslint-disable */
export default {
  data () {
    return {
      msg: 'This page is interface page',
      name: 'Sw4505'
    }
  }
}
</script>

<style type="text/css">
.redfont {
	color: red;
}
div.centre
{
  text-align: left;
  width: 70%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
div.bottom
{
  text-align: left;
  width: 70%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
  margin-top: 100px;
}
</style>
