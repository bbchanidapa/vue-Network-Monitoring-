<template>
<div class="container is-mobile">
<br>
  <div class="columns is-mobile">
    <div class="column is-2">
      <div class="box">
        <a><article class="media" v-for="index in detail">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="../img/switch-hub.png" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
                <strong>{{index.name}}</strong> <small>{{index.ip}}</small> 
            </div>
          </div>
        </article></a>
    </div>
  </div>

    <div class="column is-half">
      <div class="box">
        <p class="title is-3"><b>Internet Traffic</b></p>
        <div><canvas id="myLineChart" class="chart"></canvas></div>
         <span class="tag is-medium" id="div-in" style="width:20%;">Inbound</span> 
         <span class="title is-6"><b>Min :</b>{{minin}}<b> Max :</b>{{maxin}}<b> Average:</b>{{averagein}}</span><br>
         <span class="tag is-medium" id="div-out" style="width:20%;">Outbound</span>
         <span class="title is-6"><b>Min :</b>{{minout}}<b> Max :</b>{{maxout}}<b> Average:</b>{{averageout}}</span>
      </div>
    </div>

    <div class="column is-one-third">
      <div class="box">
        <p class="title is-3"><b>Traffic Ratio</b></p>
        <div><canvas id="myDonutChart" class="chart"></canvas></div><br>
         <div class="columns is-mobile">
            <div class="column is-6">
                <span class="tag is-medium" id="bel-SW4503">SW4503</span><span class="title is-6" id="txt-SW4503"></span>
                <span class="tag is-medium" id="bel-R124">R124</span><span class="title is-6" id="txt-R124"></span>
                <span class="tag is-medium" id="bel-R401">R401</span><span class="title is-6" id="txt-R401"></span>
            </div>
            <div class="column is-6">
                <span class="tag is-medium" id="bel-R415">R415</span><span class="title is-6" id="txt-R415"></span>
                <span class="tag is-medium" id="bel-R101C">R101C</span><span class="title is-6" id="txt-R101C"></span>
                <span class="tag is-medium" id="bel-R330A">R330A</span><span class="title is-6" id="txt-R330A"></span>
            </div>     
        </div> 
      </div>
    </div>

  </div>
</div>
</template> 
<script>
/*eslint-disable */
import axios from 'axios'
export default {
  name: 'device',
  mounted: function () {
    this.getSheet()
    console.log(this.dataPieChart)
  },
  data () {
    return {
      urlDetail: "https://apisheet.herokuapp.com/1Q6az-EGPMD-bKYa80NcOTIhAO9Jr2JFlYR9VxIZmB7Y/sheet1!A:C",
      urlDevice: "https://apisheet.herokuapp.com/1NMm2wWvoWD9GPzXzSU9jtJBLURyl3N0Nki3XOe4AovM/sheet1!A:C",
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
      axios.get(this.urlDevice).then(res => {
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
          $('#div-in').css({'background': 'rgba(54,162,235,1)'})
          $('#div-out').css({'background': 'rgba(255,161,181,1)'})
          this.Chartdata = new Chart(document.getElementById("myLineChart").getContext("2d")).Line(data_lineChart, this.options) 

      })   
    }//function
    

  }
}
</script>

<style type="text/css">
  .tag.is-medium{
    border-radius:8px;
    width: 50%;
    color: #fff;
  }
  a:hover {
    color: red;
  }

</style>
