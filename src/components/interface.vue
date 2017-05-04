<template>
<div class="container is-mobile-tablet"><br>

	<div class="tabs is-toggle is-fullwidth">
	  <ul>
	    <li v-for="index in detail" >
	      <a>
	        <span>{{index.name}}</span>
	      </a>
	    </li>
	  </ul>
	</div><br>
		<!-- *************************** SW4503 ***************************-->
	<div style=" padding: 15px; background-color: #373d45;">
		<div id="switch">
			<center>
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<span class="tab"></span>
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<span class="tab"></span>
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<span class="tab"></span>
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<span class="tab"></span>
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<br>

			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<span class="tab"></span>
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<span class="tab"></span>
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<span class="tab"></span>
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<span class="tab"></span>
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			<img src="../img/rj1.png" style="background-color:#19ff79;" @click="activeModal()">
			</center>
		</div>
	</div>

	<!-- *************************************************************** -->
	<modal-detail :show-modal="showModal" :title-data="urlDetail" :close-modal="closeModal" :detal-data="detail"></modal-detail>

	<div v-for="index in interfaces[0]['detail']">
		{{index}}
	</div>
</div>
</template> 
<script>
/*eslint-disable */
//import sw4503 from '@/components/sw4503'
import ModalDetail from '@/components/modal'

import axios from 'axios'
export default {
  name: 'Interface',
  components: { 
  	ModalDetail },
  mounted: function () {
  	this.getDetail()
	let ra = this.getRange()
  	this.range = ra['responseJSON']['range']
	//setTimeout(function(){
		this.getInterface()
	//},3000)
 	
  },
  data () {
    return {
       urlDetail: "https://apisheet.herokuapp.com/1Q6az-EGPMD-bKYa80NcOTIhAO9Jr2JFlYR9VxIZmB7Y/sheet1!C:C",
       urlInterfaceRange: "https://apisheet.herokuapp.com/1oD6EOGh9ezLEwJ-lvOf3BR_iIW7uxUYjgrTKLJS2v8E/sheet1!A:A", 
       url: "https://apisheet.herokuapp.com/1oD6EOGh9ezLEwJ-lvOf3BR_iIW7uxUYjgrTKLJS2v8E/sheet1!",
       urlInterface: '', 
       detail: '',
       interfaces: '',
       showModal: false,
       portRJ: 4,
       portFiber: 2,
       range: '',
       c:0
    }
  },
  methods: {
  	closeModal () {
  		// this.$set(this, 'showModal', false)
  		this.showModal = false
  	},
  	activeModal () {
  		this.$set(this, 'showModal', true)
  		//this.$set(this, 'showModal', true)
  	},
  	getRange () {
  		return $.ajax({ 
              type: 'GET', 
              url: this.urlInterfaceRange,
              async: false,
              success:function(data){
                console.log('getSheet Success')
              }
          })
  	},
  	getDetail () {
		axios.get(this.urlDetail).then(res => {
          let values = res.data.values
          let length  = values.length-1
          this.detail = JSON.parse(values[length][0])
        })	
  	},
  	getInterface (){
  		this.range = this.range.substring(this.range.search(":")+2,this.range.length)
  		let start = Number(this.range) - 13
        
        this.urlInterface = this.url+'C:C1400'
        console.log(this.urlInterface)
		axios.get(this.urlInterface).then(res => {
	        let values = res.data.values
	        let length  = values.length-1
	        this.interfaces = JSON.parse(values[length][0])	        
	        //console.log('interfaces',this.interfaces)
	        for (let index in this.interfaces) {
	        	//console.log(this.interfaces[index])
	        	this.delInterface (index)
	        }	    
	    }) 
  	},
  	delInterface (index_){
		let del = []
        for (let index in this.interfaces[index_]['detail']) {

        	let name = this.interfaces[index_]['detail'][index]['interface']
	    	if(name.substring(0,1) !== 'F' && name.substring(0,1) !== 'G' && name.substring(0,1) !== 'T'){
	    		//console.log(index,this.interfaces[index_]['detail'][index]['interface'])
	    		del.push(index)
	    	}
	  
	    }	
	    for (let index in del){
	    	this.interfaces[index_]['detail'].splice(index,1)
	    }
	    console.log(this.interfaces[index_]['ip'],this.interfaces[index_]['detail'].length)
  	}

  }
}
</script>

<style type="text/css">
  tab { 
    padding-left: 0.7em; 
  }
  img {
  	width: 5%;
  }
  #switch {
  	padding-top: 10px;
  	/*border: 1px solid black;*/
  	background-color: #cedcdf;
  }
  .tab {
  	padding-left: 0.7em; 
  }
</style>
