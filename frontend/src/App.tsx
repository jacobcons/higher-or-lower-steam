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
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchGameData = async () => {
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
    <div className="flex h-screen w-full items-center justify-center">
      <div className="px-8">
        <span className="mb-8 block text-center text-4xl font-bold text-gray-900 lg:mb-16">
          Score: {score}
        </span>
        <div className="flex flex-col items-center gap-x-20 gap-y-8 lg:flex-row">
          <GameCard {...gameA} />
          <div className="flex h-[var(--divider-size)] w-[var(--divider-size)] flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-base font-bold text-white lg:text-lg">
            OR
          </div>
          <GameCard {...gameB} />
        </div>
      </div>
    </div>
  );
}
