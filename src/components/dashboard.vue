<template>
  <div>
  
  <canvas width="300" height="150" id="myLineChart" class="chart"></canvas>
  <canvas width="300" height="150" id="myDonutChart" class="chart"></canvas>

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

</style>

