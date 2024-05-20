import { Race, Horse, State } from '../../types';

const state: State = {
  horses: [],
  races: [],
  results: [],
  currentRaceIndex: 0
};

const mutations = {
  incrementCurrentRaceIndex(state: State) {
    state.currentRaceIndex++;
  },
  setHorses(state: State, horses: Horse[]) {
    state.horses = horses;
  },
  setRaces(state: State, races: Race[]) {
    state.races = races;
  },
  setResults(state: State, result: Race) {
    state.results.push(result);
  }
};

const actions = {
  incrementCurrentRaceIndex({ commit }: any) {
    commit('incrementCurrentRaceIndex');
  },
  fetchHorses({ commit }: any, horses: Horse[]) {
    commit('setHorses', horses);
  },
  fetchRaces({ commit }: any, races: Race[]) {
    commit('setRaces', races);
  },
  fetchResult({ commit }: any, result: Race) {
    commit('setResults', result);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
