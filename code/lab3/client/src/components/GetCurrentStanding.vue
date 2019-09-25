<template>
  <div class="posts">
    <h1>Recuento de votos</h1>
    <div id="votes">
      <div id="cabildo_abierto" ref="cabildo_abierto"></div>
      <div id="frente_amplio" ref="frente_amplio"></div>
      <div id="peri" ref="peri"></div>
      <div id="partido_colorado" ref="partido_colorado"></div>
      <div id="partido_digital" ref="partido_digital"></div>
      <div id="partido_independiente" ref="partido_independiente"></div>
      <div id="partido_nacional" ref="partido_nacional"></div>
      <div id="partido_verde_animalista" ref="partido_verde_animalista"></div>
      <div id="partido_de_la_gente" ref="partido_de_la_gente"></div>
      <div id="partido_de_los_trabajadores" ref="partido_de_los_trabajadores"></div>
      <div id="unidad_popular" ref="unidad_popular"></div>
    </div>
    <button v-on:click="getCurrentStanding()">Calcular votos</button>
    <br>
    <span v-if="response">
      <b>{{ response }}</b>
    </span>
    <br>
    <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
    <div class="chart-wrapper">
      <chart :options="chartOptionsBar"></chart>
    </div>
  </div>
</template>
<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  name: "response",
  data() {
    return {
      response: null,
      chartOptionsBar: {}
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async getCurrentStanding() {
      this.response = null;  
      this.runSpinner();
      const apiResponse = await PostsService.getCurrentStanding();
      let currentStanding = [];
      for (let i = 0; i < apiResponse.data.length; i++) {
        currentStanding[i] = apiResponse.data[i].Record.count;
      }
      this.$refs.cabildo_abierto.innerHTML = "<h3>Cabildo abierto: "+currentStanding[0]+"</h3>";
      this.$refs.frente_amplio.innerHTML = "<h3>Frente Amplio: "+currentStanding[1]+"</h3>";
      this.$refs.partido_colorado.innerHTML = "<h3>Partido Colorado: "+currentStanding[3]+"</h3>";
      this.$refs.peri.innerHTML = "<h3>P.E.R.I: "+currentStanding[2]+"</h3>";
      this.$refs.partido_digital.innerHTML = "<h3>Partido Digital: "+currentStanding[4]+"</h3>";
      this.$refs.partido_independiente.innerHTML = "<h3>Partido Independiente: "+currentStanding[5]+"</h3>";
      this.$refs.partido_nacional.innerHTML = "<h3>Partido Nacional: "+currentStanding[6]+"</h3>";
      this.$refs.partido_verde_animalista.innerHTML = "<h3>Partido Verde Animalista: "+currentStanding[7]+"</h3>";
      this.$refs.partido_de_la_gente.innerHTML = "<h3>Partido de la Gente: "+currentStanding[8]+"</h3>";
      this.$refs.partido_de_los_trabajadores.innerHTML = "<h3>Partido de los Trabajadores: "+currentStanding[9]+"</h3>";
      this.$refs.unidad_popular.innerHTML = "<h3>Unidad Popular: "+currentStanding[10]+"</h3>";
      this.hideSpinner();
    },
    async runSpinner() {
      this.$refs.Spinner.show();
    },
    async hideSpinner() {
      this.$refs.Spinner.hide();
    }
  }
};
</script>