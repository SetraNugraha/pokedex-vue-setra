<script setup>
import { ref } from "vue";
import PokemonDetail from "./PokemonDetail.vue";

defineProps({
  data: {
    type: Object,
  },
});

const openModal = ref(false);
const pokemonName = ref("");

function openModalDetail(name) {
  pokemonName.value = name;
  openModal.value = true;
}

function closeModalDetail() {
  openModal.value = false;
}
</script>

<template>
  <div
    :key="data.name"
    @click="openModalDetail(data.name)"
    class="relative pb-10 bg-gray-600 size-34 xl:h-54 xl:w-46 rounded-lg flex flex-col items-center justify-center border-t-2 border-l-2 border-slate-300 cursor-pointer transition-all duration-300 hover:scale-110"
  >
    <img
      :src="data.image || '/img/pikachu-blank.png'"
      alt="pokemon-image"
      class="size-22 xl:size-26"
    />
    <h1
      class="absolute text-sm text-center px-3 xl:text-base bottom-1 xl:bottom-3 text-white font-semibold tracking-wider"
    >
      {{ data.name.replaceAll("-", " ") }}
    </h1>
  </div>

  <!-- Modal Pokemon Detail -->
  <div v-if="openModal">
    <PokemonDetail :closeModal="closeModalDetail" :name="pokemonName" />
  </div>
</template>

<style scoped></style>
