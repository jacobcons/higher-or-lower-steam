import { GameData } from './types.ts';

export function pickRandom() {
  return currentGameData.splice(
    Math.floor(Math.random() * currentGameData.length),
    1,
  )[0];
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export let originalGameData: GameData[] = [];
export let currentGameData: GameData[] = [];
export async function populateGameData() {
  const res = await fetch(
    'https://gist.githubusercontent.com/jacobcons/98afc1384c066954b36bf86e16bb2c01/raw/119005fc77abc0c4ee980b10953ea4ff30537c85/steam-game-data.json',
  );
  const txt = await res.text();
  originalGameData = JSON.parse(txt) as GameData[];
  currentGameData = [...originalGameData];
}

export function resetGameData() {
  currentGameData = [...originalGameData];
}

export function generateHeaderImageUrl(id: string) {
  return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${id}/header.jpg`;
}

export function loadAudio(audio: HTMLAudioElement, volume: number) {
  audio.load();
  audio.volume = volume;
}

export const correctSound = new Audio('correct.mp3');
export const wrongSound = new Audio('wrong.mp3');
