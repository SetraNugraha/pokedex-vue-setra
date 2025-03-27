<script setup>
import { usePokemon } from "./hooks/usePokemon"
import PokemonCard from "./components/PokemonCard.vue"

const {
  search,
  isAllowedNext,
  isAllowedPrev,
  inputSearch,
  offsetState,
  isLoading,
  allPokemon,
  resultSearch,
  countAllPokemon,
} = usePokemon()

const prevButton = () => isAllowedPrev && (offsetState.value -= 20)
const nextButton = () => isAllowedNext && (offsetState.value += 20)

const goToFirstPage = () => isAllowedPrev && (offsetState.value = 0)
const goToLatestPage = () => isAllowedNext && (offsetState.value = countAllPokemon.value - (countAllPokemon.value % 20))
</script>

<template>
  <main class="bg-gray-800/80 w-full min-h-screen">
    <div class="w-[90%] mx-auto xl:w-1/2 bg-black/70 min-h-screen pb-40">
      <!-- Header -->
      <section class="w-full h-[35%] pt-5">
        <div class="flex flex-col items-center justify-center gap-y-7">
          <!-- Logo -->
          <div>
            <img src="/img/pokemon-logo.png" alt="pokemon-logo" class="w-42 xl:w-100" />
          </div>

          <!-- Input Search -->
          <div class="flex items-center gap-x-3">
            <input
              type="text"
              name="searchPokemon"
              placeholder="Search Pokemon"
              class="bg-white xl:w-120 rounded-md h-9 px-5 placeholder:text-sm focus:outline-none focus:ring-3 focus:ring-blue-800"
              v-model="inputSearch" />
            <button
              class="text-white font-semibold px-2 h-9 bg-blue-500 rounded-md tracking-widest hover:bg-blue-700 cursor-pointer disabled:bg-slate-600 disabled:cursor-not-allowed"
              :disabled="!inputSearch"
              @click="search">
              Search
            </button>
          </div>
        </div>
      </section>

      <!-- RENDER POKEMON -->
      <div v-if="isLoading">
        <h1 class="text-white font-semibold text-center mt-24 text-2xl">Loading ....</h1>
      </div>
      <div v-else-if="!isLoading && allPokemon.length > 0" class="relative">
        <!-- CONTAINER CARD POKEMON -->
        <section class="mt-14 mx-7 xl:mx-14 grid grid-cols-2 gap-y-7 xl:grid-cols-4 xl:gap-5 place-items-center">
          <!-- CARD POKEMON -->
          <!-- POKEMON BY SEARCH -->
          <div v-if="resultSearch.isFound">
            <PokemonCard :data="resultSearch" />
          </div>
          <div v-else-if="resultSearch.error">
            <h1 class="text-white font-semibold text-center mt-24 text-2xl absolute -top-20 left-1/2 -translate-x-1/2">
              {{ resultSearch.error }}
            </h1>
          </div>
          <!-- ALL POKEMON -->
          <div v-else v-for="poke in allPokemon">
            <PokemonCard :data="poke" />
          </div>
        </section>
        <!-- BUTTON NEXT PREV -->
        <div
          v-if="!resultSearch.isFound && !resultSearch.error"
          class="absolute -bottom-15 left-1/2 -translate-x-1/2 text-white flex items-center gap-x-7 font-semibold text-xl">
          <!-- Go To First Page Button -->
          <button
            @click="goToFirstPage"
            :disabled="isAllowedPrev"
            class="py-1 px-3 bg-gray-600 hover:opacity-60 hover:cursor-pointer disabled:bg-gray-800 disabled:cursor-not-allowed">
            <<
          </button>
          <!-- Prev Button -->
          <button
            @click="prevButton"
            :disabled="isAllowedPrev"
            class="py-1 px-3 bg-gray-600 hover:opacity-60 hover:cursor-pointer disabled:bg-gray-800 disabled:cursor-not-allowed">
            <
          </button>

          <!-- Display Page Number -->
          <p>{{ Math.floor(offsetState / 20 + 1) }}</p>

          <!-- Next Button -->
          <button
            @click="nextButton"
            :disabled="isAllowedNext"
            class="py-1 px-3 bg-gray-600 hover:opacity-60 hover:cursor-pointer disabled:bg-gray-800 disabled:cursor-not-allowed">
            >
          </button>

          <!-- Go to latest page Button -->
          <button
            @click="goToLatestPage"
            :disabled="isAllowedNext"
            class="py-1 px-3 bg-gray-600 hover:opacity-60 hover:cursor-pointer disabled:bg-gray-800 disabled:cursor-not-allowed">
            >>
          </button>
        </div>
      </div>
      <div v-else>
        <h1 class="text-white font-semibold text-center mt-24 text-2xl">Pokemon Not Found !</h1>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
