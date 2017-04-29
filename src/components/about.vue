<template>
  <div>
  {{man[1].surname}}
  {{msg}}

  <div v-for="(i, index) in man">
  	<div v-if="true">
  		{{i.name}} {{i.surname}}
  		{{index}}
  	</div>

  </div>
  <button v-on:click="reverseMessage()">Click me</button>
  <p class="redfont">{{name}}</p>
  <input type="text" v-model="msg" name="">
  <h1>fff</h1>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  name: 'about',
  data () {
    return {
      msg: ' is about',
      name: 'Hello',
      surname: 2,
      subclass: [
      'LO', 'LA', 'LE'
      ],
      man: [
      {
      	name: 'BB',
      	surname: 'jjjjjjjjjjjj'
      },
      {
      	name: 'Jonhy',
      	surname: 'Dev'
      }
      ]
    }
  },
  methods: {
  	reverseMessage: function () {
  		this.msg = this.msg.split('').reverse().join('')
  	}
  }
}
</script>

<style type="text/css">
.redfont {
	color: red;
}
</style>
