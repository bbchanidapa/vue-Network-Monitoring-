<template>
<div class="container">
  <div class="row">
   <div class="col s2 headbut" style="margin-left:50px;"><span class="flow-text">
     <div class="collection"><br> 
     <ul>
       <li><img src="https://upic.me/i/r3/icon_router.png" width="50px"/></li>
       <li><img src="https://upic.me/i/r3/icon_router.png" width="50px"/></li>
       <li><img src="https://upic.me/i/r3/icon_router.png" width="50px"/></li>
       <li><img src="https://upic.me/i/r3/icon_router.png" width="50px"/></li>
       <li><img src="https://upic.me/i/r3/icon_router.png" width="50px"/></li>
       <li><img src="https://upic.me/i/r3/icon_router.png" width="50px"/></li>
     </ul>    
     </div>
   </span>
   </div>
   <div class="col s5 headbut2">
   <h5>Internet Traffic (Switch SW4503)</h5><br>
   <div><canvas width="300" height="150" id="myLineChart" class="chart"></canvas></div>
   
   <div id="center"class="ex1">&nbsp;Inbound</div> 
   <div class="font-max" style="margin-top: 5px;">
   <b>Min:</b>{{minin}}Gbps.
   <b>Max:</b>{{maxin}}Ghps.
   <b>Average:</b>{{averagein.toFixed(2)}}Gbps.</div> 
   <div id="center" class="ex2" style="margin-top: 5px;">&nbsp;Outbound</div> 
   <div class="font-max" style="margin-top: 5px;">
   <b>Min:</b>{{minout}}Gbs.
   <b>Max:</b>{{maxout}}Gbps.   
   <b>Average:</b>{{averageout.toFixed(2)}}Gbps.</div> 
   </div>
   <div class="col s4 headbut3" style="margin-right:0px;"> 
   <h5>Traffic Ratio</h5>
   <br>
     <canvas width="300" height="150" id="myDonutChart" class="chart"></canvas>
     <br><br>
     <div class="col s2 font-switch" id="ex3" style="background-color:#0066ff;">SW4503</div>
     <div class="col s6 font-switch"  style="background-color: #FFFFFF;">88.56 Gbps.</div>
     <div class="col s2 font-switch" id="ex3" style="background-color:#949fb1;">Rshop</div>
     <div class="col s6 font-switch"  style="background-color: #FFFFFF;">12.31 Gbps</div>
     <div class="col s2 font-switch" id="ex3" style="background-color:#f7464a;">R124</div>
     <div class="col s6 font-switch"  style="background-color: #FFFFFF;">88.56 Gbps.</div>
     <div class="col s2 font-switch" id="ex3" style="background-color:#4d5360;">R415</div>
     <div class="col s6 font-switch"  style="background-color: #FFFFFF;">88.56 Gbps.</div>
     <div class="col s2 font-switch" id="ex3" style="background-color:#fdb45c;">R415</div>
     <div class="col s6 font-switch"  style="background-color: #FFFFFF;">88.56 Gbps.</div>
     <div class="col s2 font-switch" id="ex3" style="background-color:#46bfbd;">R101C</div>
     <div class="col s6 font-switch"  style="background-color: #FFFFFF;">88.56 Gbps.</div>
   </div>
   </div>
</div>
</template>
<script>
/*eslint-disable */
import axios from 'axios'
export default {
  name: 'interface',
  mounted: function () {
      this.getSheetSw4503()
      // Milli * sec * min 
      //setInterval(this.getSheetSw4503, 1000 * 10 * 1)
      this.getSheetRatio()
      
  },
  data () {
    return {
      urlSw4503: "https://apisheet.herokuapp.com/1Oykec18xewJw68XbG3xzJ3DU1N3mMqf6l7jBUwZ58Zs/sheet1!A:C",
      urlRatio: "https://apisheet.herokuapp.com/1o1XNXtyEcKHbkh326ofZN3yQFrOFgSTW44GCro_c_Zs/sheet1!A:C" ,
      inbound: [],
      outbound: [],
      averagein: '',
      averageout: '',
      maxin: '',
      minin: '',
      minout: '',
      maxout: '',
      time:[],
      Chartdata: '',
      ChartDonut: '',
      options: {
            bezierCurve: true,
            animation: true,
            animationEasing: "easeOutQuart",
            tooltipEvents: ["mousemove", "touchstart", "touchmove"],
            tooltipCornerRadius: 3,
            pointDot : true,
            pointDotRadius : 4,
            datasetFill : true,
            scaleShowLine : true,
            animationEasing : "easeOutBounce",
            animateRotate : true,
            animateScale : true,
            responsive: true
          }
    }
  },
  methods: {  
  getSheetSw4503 () {
      this.time = []
      this.inbound = []
      this.outbound = []
      this.averagein = 0
      this.averageout = 0
     var count = 0
     this.maxin = 0
     this.minin = 0
     this.maxout = 0
     this.minout = 0
       axios.get(this.urlSw4503).then(res => {
          let values = res.data.values
          let length  = values.length-12

          for (length ; length < values.length; length++) {
            let arr = values[length][2]
            let json = JSON.parse(arr)
            this.time.push(values[length][1])
            this.inbound.push(Number(json['inbound'].substring(0,json['inbound'].search(" "))))
            this.outbound.push(Number(json['outbound'].substring(0,json['inbound'].search(" "))))  
          } 
          console.log(this.inbound,this.outbound,this.time) 
          for (count; count < this.inbound.length ; count++){
             this.averagein = this.averagein+this.inbound[count]
             this.averageout = this.averageout+this.outbound[count]
          }
           this.averagein = this.averagein/12
           this.averageout = this.averageout/12
           this.maxin = Math.max.apply(null, this.inbound)
           this.minin = Math.min.apply(null, this.inbound) 
           this.maxout = Math.max.apply(null, this.outbound)
           this.minout = Math.min.apply(null, this.outbound)

          
          
          var data_lineChart = {
            labels: this.time,
            datasets: [{
              label: "My First dataset",
              fillColor: "rgba(54,162,235,0.2)",
              strokeColor: "rgba(54,162,235,1)",
              pointColor: "rgba(54,162,235,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(54,162,235,1)",
              data: this.inbound
            }, {
              label: "My Second dataset",
              fillColor: "rgba(255,161,181,0.2)",
              strokeColor: "rgba(255,161,181,1)",
              pointColor: "rgba(255,161,181,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(255,161,181,1)",
              data: this.outbound
            }]
          }
          
        this.Chartdata = new Chart(document.getElementById("myLineChart").getContext("2d")).Line(data_lineChart, this.options)     
      })   
  },
  getSheetRatio () {
      axios.get(this.urlRatio).then(res => {
          let values = res.data.values
          let length  = values.length-1
          let ratioArr = JSON.parse(values[length][2]) 

/*          for (let index in ratioArr) {
            console.log('Ratio', ratioArr[index])
          }*/
      var dataPieChart = []
      for (let index in ratioArr) {
        
        for (let ip in ratioArr[index]) {
          if (ip == '10.77.1.2') {
            let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
            let json = {
              value: val,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "R124 :"
            }
            dataPieChart.push(json)
            console.log(ratioArr[index][ip])
            //$('#bel-R124').css({'background': '#F7464A'})
            //$('#txt-R124').html(val+' Gbps.')
            //$('#txt-R124').css({'border':'0px'})
          }
          else if (ip == '10.77.7.2') {
            let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2) 
            let json = {
                value:val,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "R101C :"//"[10.77.6.2]"
            }
            dataPieChart.push(json)
            //$('#bel-R101C').css({'background': '#46BFBD'})
            //$('#txt-R101C').html(val+' Gbps.')
            //$('#txt-R101C').css({'border':'0px'})
          }
          else if (ip == '10.77.3.2') {
            let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2) 
            let json = {
                value: val,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "R330A :"//"[10.77.3.2]"
              }
            dataPieChart.push(json)
            //$('#bel-R330A').css({'background': '#FDB45C'})
            //$('#txt-R330A').html(val+' Gbps.')
            //$('#txt-R330A').css({'border':'0px'})
          }
          else if (ip == '10.77.8.2') {
            let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
            let json = {
                value: val,
                color: "#949FB1",
                highlight: "#A8B3C5",
                label: "Rshop :"
              }
            dataPieChart.push(json) 
            //$('#txt-R401').html(val+' Gbps.')
            //$('#bel-R401').css({'background': '#949FB1'})
            //$('#txt-R401').css({'border':'0px'})
          }
          else if (ip == '10.77.5.2') {
            let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
            let json =  {
                value: val,
                color: "#4D5360",
                highlight: "#616774",
                label: "R415 :"
              }
            dataPieChart.push(json)
            //$('#bel-R415').css({'background': '#4D5360'})
            //$('#txt-R415').html(val+' Gbps.')
            //$('#txt-R415').css({'border':'0px'})
          }
          else if (ip == '10.77.4.1') {
            let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
            let json =  {
                value: val,
                color: "#0066FF",
                highlight: "#0066FF",
                label: "SW4503 :"
              }
            dataPieChart.push(json)
            //$('#bel-SW4503').css({'background': '#0066FF'})
            //$('#txt-SW4503').html(val+' Gbps.')
            //$('#txt-SW4503').css({'border':'0px'})
          }
        }
                  
      }//for
      
      this.ChartDonut = new Chart(document.getElementById("myDonutChart").getContext("2d")).Doughnut(dataPieChart, this.options)

      /*var ctx = document.getElementById("myDonutChart").getContext("2d")
      var myDoughnutChart = new Chart(ctx).Doughnut(dataPieChart,options)*/
      })
  }

  }
}
</script>

<style type="text/css">
.font-max{
  background-color: #ffc086;
  margin-left:0px;    
}
.fontback{
  background-color: #bea9a9; 
  margin-left: 10px;
  margin-right: 20px;
  margin-top: 5px;
 }
 .font-switch{
  margin-left: 5px;
  margin-right: 10px;
  margin-top: 5px;
 }
.headbut{
    background-color: #f3f3a2;
    height: 80vh;
    margin-right: 10px;    
    margin-top: 30px; 
   }
  .headbut2{
    background-color: #f1dbdf;
    height: 80vh;
    margin-top: 30px;  
    margin-right: 10px; 
    margin-left: 20px; 
  }
  .headbut3{
    background-color: #bbf8bb;
    height: 80vh;
    margin-top: 30px;  
    margin-left: 15px; 
    margin-right: 30px; 
  }  
  html { font-family: GillSans, Calibri, Trebuchet, sans-serif;}    
    .parallax-container {
    height: "your height here"; 
      }
      #top{
      height: 50px;   
    }
    #left{
      height: 500px;    
    }
    #center{
      display: block;
    margin: 0 auto;    
    }
    #right-top{
      position:relative;
      height: 500px;    
    }
    #right-down{
      position:relative;
      height: 150px;    
    }
    #trafficeSw4503{
      position:relative;
      width: 100%;    
    }
    #countries{
      position:relative;
      width: 100%;
    } 
    .ilike-blue-container {
      @extend .blue-text, .text-lighten-4;
    }
    .ilike-blue-container {
      @extend .blue, .lighten-4;
    }
    .chart{
      vertical-align: middle;
      width: 100%;
      margin: 0 auto; 
      position: relative;
      display: inline-block;

    }
    #inbound{
      position:relative;
      background: rgba(54,162,235,1);
    }
    #outbound{
      position:relative;
      background: rgba(255,161,181,1);
      margin-top: 20px;   
    }
    #div-all{
      border: 0px solid #FFFFFF;
      padding-left: 0px;
    }
    #ratio-txt{
      border: 0px solid #FFFFFF;
    }
    #ul-bel{
      border: 0px solid #FFFFFF;
      margin: 0.5rem 0 0rem 0; 
    }
    #net-traff-txt{
      border: 0px solid #FFFFFF;
    }
    #txt-ratio{
      border: 0px solid #FFFFFF;
      padding: 0;
      width: 75px;
    }
    .collection{
      border: 0px solid #FFFFFF;
      margin: 0.5rem 0 0rem 0; 
    }

    body{
        background-color: #f5f5f5;
    }
    .collection.txt-ratio{
      width: 80px;
    }
    #div-in {
      border: 0px solid #FFFFFF;
    }
        #div-out {
      border: 0px solid #FFFFFF;
    }
    div.ex1 {
    width:63px;
    background-color: #36a2eb;
    }
    div.ex2 {
    width:73px;
    background-color: #ffa1b5;
    }
    #ex3{
    width:73px;
    }
</style>
