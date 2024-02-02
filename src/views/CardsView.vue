<template>
  <div>
    <h2>Razas</h2>
    <button v-for="raza in razas" :key="raza.id" @click="filterByRaza(raza.id)" class="raza-btn">
      {{ raza.name }}
    </button>
    <button v-if="razas.length" @click="fetchPersonajes" class="raza-btn">Todos</button>

    <h2>Lista de Personajes</h2>

    <section class="result" v-html="result"></section>
    <button v-if="checkPlay" @click="play">Jugar</button>
    <button v-if="checkReset" @click="reset">Reiniciar</button>

    <button @click="reset">semareset</button>
    
    <secition class="cards-list">
      <personaje-card v-for="personaje in filteredPersonajes" :key="personaje.id" :personaje="personaje" @select="choose" :resetSelection="resetSelection"/>
      <!-- <personaje-card v-for="personaje in filteredPersonajes" :key="personaje.id" :personaje="personaje" @select="choose" /> -->
    </secition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import PersonajeCard from '../components/PersonajeCard.vue';
import myAPI from '../services/services.js'


const personajes = ref([]);
const razas = ref([]);
const filteredPersonajes = ref([]);


const resetSelection = ref(true);

const result  = ref('');

// player 1
let p1 = {
  a: 0,
  d: 0,
  n: ''
}

// player 2
let p2 = {
  a: 0,
  d: 0,
  n: ''
}

const checkPlay = ref(false)
const checkReset = ref(false)

const choose = (info) => {
  // asignar valores de la carta seleccionada a los objectos de batalla player 1 y player 2
  if( p1.n == ''){
    p1 = {...p1, ...info}
  } else {
    p2 = {...p2, ...info}
  }

  console.log(p1,p2);

  if( p1.n !== '' && p2.n !== '') {
    console.log('play!!!!')
    checkPlay.value = true;
  }
}

const play = () => {
  if( p1.a > p2.d ) {
    result.value = `<p>${p1.n} ataca a ${p2.n}.</p><p>${p1.n} gana.</p>`
  } else if ( p1.a <= p2.d ) {
    result.value = `<p>${p1.n} ataca a ${p2.n}.</p><p>${p2.n} gana.</p>`
  } else {
    result.value = `<p>${p1.n} ataca a ${p2.n}.</p><p>Empate</p>`
  }

  // checkReset.value = true;

  reset()
}


const reset = () => {
  p1.a = 0;
  p1.d = 0;
  p1.n = '';

  p2.a = 0;
  p2.d = 0;
  p2.n = '';

  resetSelection.value = !resetSelection.value;
  
}

// https://restapi.nemesisweb.dev/wp-json/wp/v2/raza
const fetchRazas = async () => {
  const razasData = await myAPI.fetchData('raza');
  razas.value = razasData;
};

// https://restapi.nemesisweb.dev/wp-json/wp/v2/personajes
const fetchPersonajes = async () => {
  const personajesData = await myAPI.fetchData('personajes');
  personajes.value = personajesData;
  filteredPersonajes.value = personajesData;
};

const filterByRaza = (razaId) => {
  // Filtra los personajes por la raza seleccionada
  console.log(personajes.value);
  const filteredRaza = personajes.value.filter(personaje => personaje.raza[0] == razaId)
  filteredPersonajes.value = filteredRaza;
};

onMounted(async () => {
  await fetchRazas();
  await fetchPersonajes();
});

</script>




<style>
  .cards-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    max-width: 100%;
  }
  .raza-btn {
    cursor: pointer;
  }
</style>
