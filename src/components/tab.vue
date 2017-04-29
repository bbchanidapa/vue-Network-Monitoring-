<template>

  <nav>
    <div class="nav-wrapper  light-blue darken-4">
      <div class="container">
            <a href="#" class="brand-logo">FITM Monitoring v1.0</a>
        <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down ">
          <li><router-link :to="{ path: 'dashboard' }">Dashboard</router-link></li>
          <li><router-link :to="{ path: 'devices' }">Device</router-link></li>
        </ul>
        <ul class="side-nav" id="mobile-demo">
          <li><router-link :to="{ path: 'dashboard' }">Dashboard</router-link></li>
          <li><router-link :to="{ path: 'devices' }">Device</router-link></li>
        </ul>
      </div>
    </div>
</nav>

</template>
<script type="text/javascript">

</script>
<style type="text/css">

</style>
