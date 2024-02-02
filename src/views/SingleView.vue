<!-- PersonajeDetalle.vue -->
<template>
  <div class="personaje">
    <template v-if="personaje && personaje.title">
      <h2>{{ personaje.title.rendered }}</h2>
      <p v-html="personaje.content.rendered"></p>
      <div class="info">
        <h3>Características</h3>
        <p>Ataque: {{ personaje.acf.ataque }}</p>
        <p>Defensa: {{ personaje.acf.defensa }}</p>
      </div> 
      <!-- Otros detalles del personaje -->
      <img :src="img" alt="">

    </template>

    <template v-else>
      <p>Cargando...</p>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import myAPI from '../services/services.js'

// const personaje = ref(null);

const props = defineProps(['id']);
const personaje = ref();
const img = ref();



onMounted(async () => {
  // console.log('sema....')
  // console.log(props.id);
  // Obtener el ID del personaje desde la ruta
  const personajeId = props.id;
  // Obtener los datos del personaje
  personaje.value = await myAPI.fetchData(`personajes/${personajeId}`);
  console.log(personaje.value)
  console.log('persmedia',personaje.value.featured_media)
  img.value = await myAPI.fetchFeaturedImage(personaje.value.featured_media)

});
</script>

<style scoped>

.personaje {
  max-width: 100%;
  .info {
    margin-block: 2rem;
  }
  img {
    width: 100%;
  }
}

</style>
