import { ref, watchEffect, reactive } from "vue"
import axios from "axios"

export const usePokemon = () => {
  const isLoading = ref(false)
  const allPokemon = ref([])
  const POKEMON_API = import.meta.env.VITE_BASE_URL
  const offsetState = ref(0)
  const isAllowedPrev = ref(false)
  const isAllowedNext = ref(false)
  const countAllPokemon = ref(0)
  const inputSearch = ref("")
  const resultSearch = reactive({
    name: "",
    image: null,
    isFound: false,
    error: null,
  })

  const getAllPokemon = async (offset = 0) => {
    isLoading.value = true
    try {
      const { data } = await axios.get(POKEMON_API, {
        params: {
          offset: offset,
        },
      })

      isAllowedPrev.value = data.previous === null ? true : false
      isAllowedNext.value = data.next === null ? true : false
      countAllPokemon.value = data.count

      const getDetailedPokemon = await Promise.all(
        data.results.map(async ({ name, url }) => {
          const { data: detail } = await axios.get(url)
          return {
            name: name,
            image: detail.sprites.front_default,
          }
        }),
      )

      allPokemon.value = getDetailedPokemon
    } catch (error) {
      console.error("getAllPokemon Error: ", error.message)
    } finally {
      isLoading.value = false
    }
  }

  watchEffect(() => {
    getAllPokemon(offsetState.value)
  })

  const search = async () => {
    isLoading.value = true
    try {
      const endpoint = `${POKEMON_API}/${inputSearch.value.replaceAll(" ", "-")}`
      const { data } = await axios.get(endpoint)
      resultSearch.isFound = true
      resultSearch.name = data.name
      resultSearch.image = data.sprites.front_default
      resultSearch.error = null
    } catch (error) {
      if (error.response && error.response.status === 404) {
        resultSearch.error = "Pokemon Not Found !"
      } else {
        resultSearch.error = "Unexpected error occured, try to refresh page."
      }

      resultSearch.isFound = false

      console.error("Search pokemon error: ", error)
    } finally {
      isLoading.value = false
    }
  }

  watchEffect(() => {
    if (inputSearch.value === "") {
      getAllPokemon(offsetState.value)
      resultSearch.name = ""
      resultSearch.image = null
      resultSearch.isFound = false
      resultSearch.error = null
    }
  })

  return {
    search,
    getAllPokemon,
    isAllowedNext,
    isAllowedPrev,
    inputSearch,
    offsetState,
    isLoading,
    allPokemon,
    resultSearch,
    countAllPokemon,
  }
}
