<template>
  <div id="app">
    <img alt="Escudo Uruguay" src="./assets/uruguay.png" style="width:15%">    
      
        <p><router-link to="/">Inicio</router-link>&nbsp;    
        <router-link to="/getCurrentStanding">Resultados</router-link>&nbsp;      
        <router-link to="/QueryAll">Ver Transacciones</router-link></p>
      <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'app'  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.chart-wrapper {
  width: 100%;
  height: 700px;
}
.echarts {
  width: 100%;
  height: 100%;
}

#loader {
  position:fixed;
  padding-top: 250px;
}

.chart-wrapper {
  position:fixed;
  padding-left:32%;
}
</style>
