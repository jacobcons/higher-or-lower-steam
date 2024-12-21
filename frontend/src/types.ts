export type GameData = {
  id: string;
  name: string;
  currentPlayers: number;
};

export type GameCardData = GameData & {
  showCurrentPlayers: boolean;
  disableButton?: boolean;
};

export const enum DividerState {
  Or,
  Tick,
  Cross,
}

export const enum ModalState {
  Hide,
  Win,
  Lose,
}
