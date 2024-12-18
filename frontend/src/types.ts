export type GameData = {
  id: string;
  name: string;
  currentPlayers: number;
};

export type GameCardData = GameData & {
  showCurrentPlayers: boolean;
};

export const enum DividerState {
  Or,
  Tick,
  Cross,
}
