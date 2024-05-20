const state = {
  count: 0,
  horses: [],
  races: [],
  results: [],
  currentRaceIndex: 0
}

const mutations = {
  incrementCurrentRaceIndex(state) {
    state.currentRaceIndex++;
  },
  setHorses(state, horses) {
    state.horses = horses;
  },
  setRaces(state, races) {
    state.races = races;
  },
  setResults(state, results) {
    state.results.push(results);
  }
}

const actions = {
  incrementCurrentRaceIndex({ commit }) {
    commit('incrementCurrentRaceIndex');
  },
  fetchHorses({ commit }, horses) {
    commit('setHorses', horses);
  },
  fetchRaces({ commit }, races) {
    commit('setRaces', races);
  },
  fetchResults({ commit }, results) {
    commit('setResults', results);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}