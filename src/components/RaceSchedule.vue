<template>
  <div class="race-schedule">
    <h2 style="background-color: #4a4aff; padding: 8px;">Program</h2>
    <div class="table-responsive">
      <table>
        <tbody>
          <template v-for="(race, rI) in races">
            <tr>
              <td colspan="2" style="background-color: red; text-align: center;">{{ `${rI + 1}. Lap - ${race.distance}m` }}</td>
            </tr>
            <tr>
              <td class="table--th">Position</td>
              <td class="table--th">Name</td>
            </tr>
            <template v-for="(horse, hI) in race.horses">
              <tr>
                <td>{{ hI + 1 }}</td>
                <td style="text-align: center;">{{ horse.name }}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const horses = computed(() => store.state.racing.horses)
const races = computed(() => store.state.racing.races)

const getRandomHorses = (n) => {
  const horsesTemp = []
  const availableHorses = [...horses.value]
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * availableHorses.length)
    const selectedHorse = availableHorses.splice(randomIndex, 1)[0]
    horsesTemp.push({...selectedHorse, location: 0})
  }
  return horsesTemp
}

// create list for all races randomly
const generateRaces = () => {
  const racesTemp = []
  for (let i = 0; i < 6; i++) {
    const distance = [1200, 1400, 1600, 1800, 2000, 2200][i]
    const horsesRandom = getRandomHorses(10)
    racesTemp.push({
      id: i + 1,
      distance: distance,
      horses: horsesRandom,
      result: null,
    })
  }
  store.dispatch('racing/fetchRaces', racesTemp)
}

defineExpose({
  generateRaces
})

</script>

<style scoped>
.table-responsive {
  overflow-y: auto;
  max-height: 600px;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.table--th {
  background-color: #dddddd;
}

td, th {
  border: 1px solid #bababa;
  text-align: left;
  padding: 8px;
}
</style>
