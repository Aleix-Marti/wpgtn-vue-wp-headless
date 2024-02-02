<!-- PersonajeCard.vue -->
<template>
  <div class="personaje-card" :class="{selected : isSelected, blocked : isBlocked }" :style="{ 'background': 'linear-gradient(transparent, transparent 50%, rgb(0 0 0 / .9) 70%), url(' + img + ')' }" style="background-size: cover;background-position: center;background-repeat: no-repeat;">
    <p class="raza">{{ raza }}</p>
    <h3>{{ personaje.title.rendered }}</h3>
    <div><span>A: {{ personaje.acf.ataque }}</span> | <span>D: {{ personaje.acf.defensa }}</span></div>
    <div class="actions">
      <button @click="$router.push({ name: 'personaje', params: {id: personaje.id } })">Ver</button>
      <button @click="select">Elegir</button>
    </div>


  </div>
</template>

<script setup>

import { ref, defineProps, onBeforeMount, onMounted, watch } from 'vue';
import axios from 'axios';
import myAPI from '../services/services.js'

const props = defineProps(['personaje', 'resetSelection']);
const emits = defineEmits(['select']);

const isSelected = ref(false);
const personaje = ref(props.personaje);
const img = ref('');
const raza = ref('');
const info = { a: '',d: '',n: ''}
const isBlocked = ref(false);



const select = () => {
  info.a = personaje.value.acf.ataque;
  info.d = personaje.value.acf.defensa;
  info.n = personaje.value.title.rendered;
  isSelected.value = !isSelected.value;

  emits('select', info);
}

onBeforeMount(async () => {
  const personajeId = props.personaje.id;
  personaje.value = await myAPI.fetchData(`personajes/${personajeId}`);
  img.value = await myAPI.fetchFeaturedImage(personaje.value.featured_media)
  raza.value = await myAPI.fetchRaza(personaje.value.raza[0])
});

watch(() => props.resetSelection, () => {
  if(isSelected.value == true) isBlocked.value = true;
});

// // Puedes omitir esto si no necesitas realizar alguna acción específica al recibir el evento personalizado
// const eventoPersonalizadoHandler = () => {
//   // Lógica para manejar el evento personalizado
//   console.log('Evento personalizado recibido en el componente hijo');
// }

// onMounted(() => {
//   // Escuchar el evento personalizado cuando el componente se monta
//   emits('eventoPersonalizado', eventoPersonalizadoHandler);
// });

</script>

<style scoped>
/* Estilos de la tarjeta aquí */
.personaje-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: .5rem;
  padding: 1rem;
  /* text-align: center; */
  border-radius: 6px;
  min-width: 200px;
  aspect-ratio: 3/4;
  overflow: hidden;
  &.selected {
    box-shadow: 0 0 10px -2px #00BD7E;
  }
  &.blocked {
    filter: blur(2px);
  }
  .raza {
    display: block;
    position: absolute;
    left: .5rem;
    top: .5rem;
    width: fit-content;
    border-radius: 6px;
    /* margin-bottom: auto; */
    padding: .25rem .5rem;
    /* text-shadow: 0 0 2px white; */
    color: gray;
    background: black;
    /* background: linear-gradient(45deg, black, black, 70%, transparent); */
    font-size: 1rem;
    align-self: flex-start;
    z-index: 1;
    /* &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, black, black, 70%, transparent);
      z-index: -1;
    } */
  }
  h3 {
    margin: 0;
    font-size: 1.2rem;
    line-height: 1;
  }
  button {
    cursor: pointer;
  }
}
.actions {
  display: flex;
  gap: .5rem;
}
</style>
