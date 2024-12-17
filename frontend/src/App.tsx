import { useEffect, useState } from 'react';
import GameCard from './GameCard.tsx';
import { GameData } from './types.ts';

let gameData: GameData[] = [];

function pickRandom(arr) {
  return arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
}

export default function App() {
  const [gameA, setGameA] = useState<GameData>();
  const [gameB, setGameB] = useState<GameData>();

  useEffect(() => {
    const fetchGameData = async () => {
      debugger;
      const res = await fetch(
        'https://gist.githubusercontent.com/jacobcons/98afc1384c066954b36bf86e16bb2c01/raw/119005fc77abc0c4ee980b10953ea4ff30537c85/steam-game-data.json',
      );
      const txt = await res.text();
      gameData = JSON.parse(txt) as GameData[];
      setGameA(pickRandom(gameData));
      setGameB(pickRandom(gameData));
    };

    fetchGameData();
  }, []);

  return (
    <div className="flex">
      <GameCard {...gameA} />
      <GameCard {...gameB} />
    </div>
  );
}
