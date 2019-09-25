<template>
  <div class="posts">
    <h1>Seleccionar Candidato</h1>
    <input type="radio" id="one" value="Partido Nacional" v-model="picked">
    <label for="one">Luis Lacalle Pou (Partido Nacional)</label>
    <br>
    <input type="radio" id="two" value="Frente Amplio" v-model="picked">
    <label for="two">Daniel Martinez (Frente Amplio)</label>
    <br>
    <input type="radio" id="two" value="Partido Colorado" v-model="picked">
    <label for="two">Ernesto Talvi (Partido Colorado)</label>
    <br>
    <input type="radio" id="two" value="Cabildo Abierto" v-model="picked">
    <label for="two">Guido Manini Rios (Cabildo Abierto)</label>
    <br>
    <input type="radio" id="two" value="Partido de la Gente" v-model="picked">
    <label for="two">Edgardo Novik (Partido de la Gente)</label>
    <br>
    <input type="radio" id="two" value="Unidad Popular" v-model="picked">
    <label for="two">Gonzalo Abella (Unidad Popular)</label>
    <br>
    <input type="radio" id="two" value="Partido Verde Animalista" v-model="picked">
    <label for="two">Gustavo Salle (Partido Verde Animalista)</label>
    <br>
    <input type="radio" id="two" value="Peri" v-model="picked">
    <label for="two">César Vega (P.E.R.I)</label>
    <br>
    <input type="radio" id="two" value="Partido Independiente" v-model="picked">
    <label for="two">Pablo Mieres (Partido Independiente)</label>
    <br>
    <input type="radio" id="two" value="Partido Digital" v-model="picked">
    <label for="two">Daniel Goldman (Partido Digital)</label>
    <br>
    <input type="radio" id="two" value="Partido de losTrabajadores" v-model="picked">
    <label for="two">Rafel Fernández (Partido de los Trabajadores)</label>
    <br>
    <br>
    <span v-if="picked">
      Seleccionado:
      <b>{{ picked }}</b>
    </span>
    <br>
    <br>
    <form v-on:submit="castBallot">
      <input type="text" v-model="input.voterId" placeholder="Ingresar ID">
      <br>
      <input type="submit" value="Enviar Voto">
      <br>
    </form>

    <br>
    <span v-if="response">
      <b>{{ response }}</b>
    </span>
    <br>
    <vue-instant-loading-spinner id="loader" ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      input: {},
      picked: null,
      response: null
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async castBallot() {
      await this.runSpinner();

      const electionRes = await PostsService.queryWithQueryString('election');

      let electionId = electionRes.data[0].Key;

      console.log("Seleccionado: ");
      console.log(this.picked);
      console.log("IdVotacion: ");
      console.log(this.input.voterId);
      this.response = null;

 

      //error checking for making sure to vote for a valid party
      if (this.picked === null ) {
        console.log('this.picked === null')

        let response = "Debe seleccionar un candidato para poder votar!";
        this.response = response;
        await this.hideSpinner();
      
      } else if (this.input.voterId === undefined) {
        console.log('this.voterId === undefined')

        let response = "Debe ingresar su ID de votación para poder votar! ";
        this.response = response;
        await this.hideSpinner();

      } else {

        const apiResponse = await PostsService.castBallot(
          electionId,
          this.input.voterId,
          this.picked
        );

        console.log('apiResponse: &&&&&&&&&&&&&&&&&&&&&&&');
        console.log(apiResponse);

        if (apiResponse.data.error) {
          this.response= apiResponse.data.error;
          await this.hideSpinner();
        } else if (apiResponse.data.message) {
          this.response= `No se encontro el ID de Votación: ${this.input.voterId}
            . ¿Esta seguro de que ingreo un ID valido?`;
          await this.hideSpinner();
        } 
        else {
          let response = `Voto enviado satisfactoriamente! Se realizo un voto al partido ${this.picked} emitido por el usuario ${apiResponse.data.voterId}. Gracias por cumplir con su deber ciudadano!`;

          this.response = response;
          console.log(this.input);
          await this.hideSpinner();
        }
      }
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
