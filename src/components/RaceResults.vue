<template>
  <div class="race-results">
    <h2 style="background-color: #1ba71b; padding: 8px;">Results</h2>
    <div class="table-responsive">
      <table>
        <tbody>
          <template v-for="(race, rI) in results" :key="`race-${rI}`">
            <tr>
              <td :colspan="2" style="background-color: red; text-align: center;">{{ `${rI + 1}. Lap - ${race.distance}m` }}</td>
            </tr>
            <tr>
              <td class="table--th">Position</td>
              <td class="table--th">Name</td>
            </tr>
            <template v-for="(horse, hI) in race.result" :key="`horse-${hI}`">
              <tr>
                <td :style="{ 'background-color': hI === 0 ? '#2eba2e' : 'unset' }">{{ hI + 1 }}</td>
                <td :style="{ 'background-color': hI === 0 ? '#2eba2e' : 'unset' }" style="text-align: center;">{{ horse.name }}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineExpose } from 'vue';
import { useStore } from 'vuex';
import { Horse } from '../types';

const store = useStore();

const racingState = computed(() => store.state.racing);
const races = computed(() => racingState.value.races);
const results = computed(() => racingState.value.results);
const currentRaceIndex = computed(() => racingState.value.currentRaceIndex);

const startRaces = () => {
  runRace(currentRaceIndex.value);
};

const runRace = (index: number) => {
  const width = (document.getElementsByClassName("runway")[0] as HTMLElement).offsetWidth;

  // Set up an interval to update horse positions
  let intervalID = setInterval(() => {
    races.value[index].horses.forEach((horse: Horse) => {
      // Calculate the new location based on horse's condition and track width
      horse.location = (horse.location + (horse.condition / (10 / (width / 100)))) > width ? width : (horse.location + (horse.condition / (10 / (width / 100))));
    });

    // Check if any horse has reached end of the track
    if (races.value[index].horses.some((horse: Horse) => horse.location >= (width - 100))) {
      clearInterval(intervalID);

      const horsesTemp = [...races.value[index].horses];
      const sortedHorses = horsesTemp.sort((a, b) => b.condition - a.condition);
      races.value[index].result = sortedHorses;
      store.dispatch('racing/fetchResult', races.value[index]);

      store.dispatch('racing/incrementCurrentRaceIndex');

      // Check if there are more races to run
      if (currentRaceIndex.value < 6) {
        runRace(currentRaceIndex.value);
      }
    }
  }, 500);
};

defineExpose({
  startRaces
});
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
