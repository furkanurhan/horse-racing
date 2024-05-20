// types.ts

export interface Horse {
  id: number;
  name: string;
  condition: number;
  location?: any;
  color: string;
}

export interface Race {
  id: number;
  distance: number;
  horses: Horse[];
  result?: Race | null;
}

export interface State {
  horses: Horse[];
  races: Race[];
  results: Race[];
  currentRaceIndex: number;
}