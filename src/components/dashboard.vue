<template>
<div class="container">
    <div class="row">
      <div class="col s12 m12 l12" id="top"></div>

      <div class="col s12 m3 l2" >
        <ul class="collection" v-for="index in detail">
              <li class="collection-item">
              <span class="title"><b>{{index.name}}</b> ({{index.ip}})</span> <br>        
              Cpu: {{index.cpu}}% Temp: {{index.temp}}F
            </li>
        </ul>
      </div><!-- left -->

      <div class=" col s12 m9 l6" id="center">
        <div class="card-panel col s12 m10 l12" id="center">
          <div class="col-xs-4">
            <div class="panel panel-default">

              <div class="panel-heading">
                <h4 class="panel-title"><span class="blue-text text-darken-2">Internet Traffic (Switch SW4503)</span></h4>
              </div>

              <canvas id="myLineChart" class="chart"></canvas>
              <ul class="collection" id="net-traff-txt">
                <ul class="collection col s3 m3 l2" id="div-all">
                      <li class="collection" id="inbound"><center><b>Inbound</b></center></li>
                      <li class="collection" id="outbound"><center><b>Outbound</b></center></li>
                  </ul>
                  <ul class="collection col s9 m9 l10" >
                      <li class="collection-item" id="div-in"></li>
                      <li class="collection-item" id="div-out"></li>
                  </ul>
                </ul>
            </div>
          </div> 
        </div>
      </div><!-- center -->

      <div class=" col s12 m8 l4" id="right-top">
        <div class="card-panel col s12 m8 l12" id="right-top">
            <div class="panel-heading">
                <h4 class="panel-title"><span class="blue-text text-darken-2">Traffic Ratio</span></h4>
              </div>
              <div class="panel-content text-center">
                  <canvas id="myDonutChart" class="chart"></canvas>
              </div>

              <ul class="collection" id="ratio-txt">
              
              <ul class="collection col s6 m9 l4" id="ul-bel">
                  <li class="collection" id="bel-SW4503"><center>
                    <b class="grey-text text-lighten-5">SW4503</b></center>
                  </li>
                  <li class="collection" id="bel-R124"><center>
                    <b class="grey-text text-lighten-5">R124</b></center>
                  </li>
                  <li class="collection" id="bel-R330A"><center>
                    <b class="grey-text text-lighten-5">R330A</b></center>
                  </li>
              </ul>
              <ul class="collection col s6 m9 l8" >
                  <li class="collection txt-ratio" id="txt-SW4503"></li>
                  <li class="collection txt-ratio" id="txt-R124"></li>
                  <li class="collection txt-ratio" id="txt-R330A"></li>
              </ul>
              <ul class="collection col s6 m9 l4" id="ul-bel">
                  <li class="collection" id="bel-R401"><center>
                    <b class="grey-text text-lighten-5">Rshop</b></center>
                  </li>
                  <li class="collection" id="bel-R415"><center>
                    <b class="grey-text text-lighten-5">R415</b></center>
                  </li>
                  <li class="collection" id="bel-R101C"><center>
                    <b class="grey-text text-lighten-5">R101C</b></center>
                  </li>
              </ul>
              <ul class="collection col s6 m9 l3" >
                  <li class="collection txt-ratio" id="txt-R401"></li>
                  <li class="collection txt-ratio" id="txt-R415"></li>
                  <li class="collection txt-ratio" id="txt-R101C"></li>
              </ul>
          </ul>
        </div>
      </div><!-- right -->

    </div><!-- row -->
  </div><!-- container -->
</template> 
<script>
/*eslint-disable */
import axios from 'axios'
export default {
  name: 'interface',
  mounted: function () {
      this.getSheet()
      //setInterval(this.getSheet, 1000 * 10 * 3) 
  },
  data () {
    return {
      urlDetail: "https://apisheet.herokuapp.com/1Q6az-EGPMD-bKYa80NcOTIhAO9Jr2JFlYR9VxIZmB7Y/sheet1!A:C",
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
      dataPieChart: [],
      detail: '',
      data: [],
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
  getSheet () {
      this.time = []
      this.inbound = []
      this.outbound = []
      this.dataPieChart = []
      this.averagein = 0
      this.averageout = 0
      var count = 0
      this.maxin = 0
      this.minin = 0
      this.maxout = 0
      this.minout = 0

      axios.get(this.urlDetail).then(res => {
          let values = res.data.values
          let length  = values.length-1
          this.detail = JSON.parse(values[length][2])
          console.log('urlDetail',this.detail )
      })

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

          for (count; count < this.inbound.length ; count++){
             this.averagein = this.averagein+this.inbound[count]
             this.averageout = this.averageout+this.outbound[count]
          }
           this.averagein = (this.averagein/12).toFixed(2)
           this.averageout = (this.averageout/12).toFixed(2)
           this.maxin = Math.max.apply(null, this.inbound).toFixed(2)
           this.minin = Math.min.apply(null, this.inbound).toFixed(2) 
           this.maxout = Math.max.apply(null, this.outbound).toFixed(2)
           this.minout = Math.min.apply(null, this.outbound).toFixed(2)    
          
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

    let divIn = "<b>Min :</b>"+this.minin+" <b> Max :</b>"+this.maxin+" <b> Average:</b>"+ this.averagein,
        divOut = "<b>Min :</b>"+this.minout+" <b> Max :</b>"+this.maxout+" <b> Average:</b>"+ this.averageout;

    $('#div-in').html(divIn)
    $('#div-out').html(divOut)

        this.Chartdata = new Chart(document.getElementById("myLineChart").getContext("2d")).Line(data_lineChart, this.options)     
      })   
  
      //***************** Data Pie Chart***********************
      axios.get(this.urlRatio).then(res => {
          let values = res.data.values
          let length  = values.length-1
          let ratioArr = JSON.parse(values[length][2]) 
          
      for (let index in ratioArr) {
        for (let ip in ratioArr[index]) {
          let unit = ratioArr[index][ip].substring(ratioArr[index][ip].search(" ") ,ratioArr[index][ip].length)
          console.log(unit)
          if (ip == '10.77.1.2') {
            let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
            let json = {
              value: val,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "R124 :"
            }
            this.dataPieChart.push(json)
            this.data.push(val+unit)

            $('#txt-R124').html(val+unit)
            $('#bel-R124').css({'background': '#F7464A'})
            $('#txt-R124').css({'border':'0px'})
          }
          else if (ip == '10.77.7.2') {
            let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2) 
            let json = {
                value:val,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "R101C :"
            }
            this.dataPieChart.push(json)
            this.data.push(val+unit)

            $('#txt-R101C').html(val+unit)
            $('#bel-R101C').css({'background': '#46BFBD'})  
            $('#txt-R101C').css({'border':'0px'})
          }
          else if (ip == '10.77.3.2') {
            let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2) 
            let json = {
                value: val,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "R330A :"
              }
            this.dataPieChart.push(json)
            this.data.push(val+unit)

            $('#txt-R330A').html(val+unit)
            $('#bel-R330A').css({'background': '#FDB45C'})   
            $('#txt-R330A').css({'border':'0px'})
          }
          else if (ip == '10.77.8.2') {
            let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
            let json = {
                value: val,
                color: "#949FB1",
                highlight: "#A8B3C5",
                label: "Rshop :"
              }
            this.dataPieChart.push(json) 
            this.data.push(val+unit)

            $('#txt-R401').html(val+unit)
            $('#bel-R401').css({'background': '#949FB1'})
            $('#txt-R401').css({'border':'0px'})
          }
          else if (ip == '10.77.5.2') {
            let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
            let json =  {
                value: val,
                color: "#4D5360",
                highlight: "#616774",
                label: "R415 :"
              }
            this.dataPieChart.push(json)
            this.data.push(val+unit)

            $('#txt-R415').html(val+unit)
            $('#bel-R415').css({'background': '#4D5360'})    
            $('#txt-R415').css({'border':'0px'})
          }
          else if (ip == '10.77.4.1') {
            let val = Number(ratioArr[index][ip].substring(0,ratioArr[index][ip].search(" "))).toFixed(2)
            let json =  {
                value: val,
                color: "#0066FF",
                highlight: "#0066FF",
                label: "SW4503 :"
              }
            this.dataPieChart.push(json)
            this.data.push(val+unit)

            $('#txt-SW4503').html(val+unit)
            $('#bel-SW4503').css({'background': '#0066FF'})
            $('#txt-SW4503').css({'border':'0px'})
          }
        }
                  
      }//for
      
      this.ChartDonut = new Chart(document.getElementById("myDonutChart").getContext("2d")).Doughnut(this.dataPieChart, this.options)

      })
  }

  }
}
</script>

<style type="text/css">
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
      position:relative;
      height: 500px;    
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
    .collection-item {
      margin-bottom: 0px;
      margin-top: 0px;
    }
</style>
