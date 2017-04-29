<template>
  <div id="app" style="width=100vw;height:100vh;">
   <headtab></headtab>
    <router-view></router-view>
  </div>
</template>
<script>
import headtab from '@/components/tab'
/*eslint-disable */
export default {
  name: 'app',
  components: { headtab }
}

</script>
