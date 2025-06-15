<script setup>
import axios from "axios"
import { ref, watchEffect } from "vue"
const props = defineProps({
  closeModal: {
    type: Function,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

const isLoading = ref(false)
const pokemonDetail = ref({})
const POKEMON_API = import.meta.env.VITE_BASE_URL

const getPokemonDetail = async (name) => {
  isLoading.value = true
  try {
    const response = await axios.get(`${POKEMON_API}/${name}`)
    pokemonDetail.value = response.data
  } catch (error) {
    console.error("Error get pokemon detail: ", error)
  } finally {
    isLoading.value = false
  }
}

watchEffect(() => {
  getPokemonDetail(props.name)
})
</script>

<template>
  <div class="fixed inset-0 z-10 bg-slate-700/80">
    <div
      class="bg-slate-800 rounded-2xl px-5 xl:px-20 py-10 w-90 xl:w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <!-- Loading -->
      <div v-if="isLoading" class="text-white flex items-center justify-between">
        <h1 class="text-2xl font-bold">Loading ....</h1>
      </div>

      <!-- RENDER DETAIL POKEMON -->
      <div v-else-if="!isLoading">
        <!-- Header -->
        <div class="text-white flex items-center justify-between">
          <h1 class="text-2xl font-bold">Pokemon Detail</h1>
          <button @click="closeModal" class="text-2xl font-bold hover:text-red-500 cursor-pointer duration-300">
            X
          </button>
        </div>

        <div class="mt-5 flex flex-col xl:flex-row xl:items-start gap-x-10">
          <!-- Image -->
          <div
            class="relative bg-gray-600 py-5 xl:h-110 xl:w-90 grid place-items-center rounded-lg border-t-2 border-l-2 border-slate-300">
            <img :src="pokemonDetail.sprites.front_default || '/img/pikachu-blank.png'" alt="pokemon-image" class="size-36 xl:size-66" />
          </div>
          <!-- Description -->
          <div class="text-white tracking-wider flex flex-col items-start gap-y-5 mt-2">
            <!-- Name -->
            <div>
              <h1 class="font-bold text-2xl">Name</h1>
              <p class="font-semibold">{{ pokemonDetail.name.replaceAll("-", " ") }}</p>
            </div>

            <!-- Type -->
            <div>
              <h1 class="font-bold text-2xl">Type</h1>
              <p v-for="types in pokemonDetail.types" class="font-semibold">{{ types.type.name }}</p>
            </div>

            <!-- Height & Weigth -->
            <div>
              <h1 class="font-bold text-2xl">Height & Weight</h1>
              <p class="font-semibold">{{ pokemonDetail.height + " x " + pokemonDetail.weight }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
