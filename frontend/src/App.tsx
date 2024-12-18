import { useEffect, useState } from 'react';
import GameCard from './GameCard.tsx';
import { DividerState, GameCardData, GameData } from './types.ts';

let gameData: GameData[] = [];

function pickRandom<T>(arr: T[]) {
  return arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
}

export default function App() {
  const [gameCardAData, setGameCardAData] = useState<GameCardData>();
  const [gameCardBData, setGameCardBData] = useState<GameCardData>();
  const [score, setScore] = useState(0);
  const [dividerState, setDividerState] = useState(DividerState.Or);

  useEffect(() => {
    const fetchGameData = async () => {
      const res = await fetch(
        'https://gist.githubusercontent.com/jacobcons/98afc1384c066954b36bf86e16bb2c01/raw/119005fc77abc0c4ee980b10953ea4ff30537c85/steam-game-data.json',
      );
      const txt = await res.text();
      gameData = JSON.parse(txt) as GameData[];
      setGameCardAData({ ...pickRandom(gameData), showCurrentPlayers: true });
      setGameCardBData({ ...pickRandom(gameData), showCurrentPlayers: false });
    };

    fetchGameData();
  }, []);

  const handleClick = (id: string) => {
    if (gameCardAData && gameCardBData) {
      setGameCardAData({ ...gameCardAData, showCurrentPlayers: true });
      setGameCardBData({ ...gameCardBData, showCurrentPlayers: true });

      const clickedGameCard =
        id === gameCardAData.id ? gameCardAData : gameCardBData;
      const otherGameCard =
        id === gameCardAData.id ? gameCardBData : gameCardAData;
      if (clickedGameCard.currentPlayers >= otherGameCard.currentPlayers) {
        setDividerState(DividerState.Tick);
        setScore(score + 1);
      } else {
        setDividerState(DividerState.Cross);
      }
    }
  };

  if (gameCardAData && gameCardBData) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="max-w-5xl px-8">
          <span className="mb-8 block text-center text-4xl font-bold text-gray-900 vertical:mb-4 vertical:text-xl">
            Score: {score}
          </span>
          <div className="flex flex-col items-end gap-x-12 gap-y-8 lg:flex-row vertical:gap-y-4">
            <GameCard {...gameCardAData} handleClick={handleClick} />
            <div
              className={`flex h-[var(--divider-size)] w-[var(--divider-size)] flex-shrink-0 items-center justify-center self-center rounded-full bg-gray-900 font-bold text-white vertical:text-sm ${dividerState === DividerState.Tick || dividerState === DividerState.Cross ? 'font-arial text-2xl' : 'text-lg'} ${dividerState === DividerState.Tick ? 'bg-green-600' : ''} ${dividerState === DividerState.Cross ? 'bg-red-600' : ''}`}
            >
              {dividerState === DividerState.Or
                ? 'OR'
                : dividerState === DividerState.Tick
                  ? '✔'
                  : dividerState === DividerState.Cross
                    ? '✖'
                    : null}
            </div>
            <GameCard {...gameCardBData} handleClick={handleClick} />
          </div>
        </div>
      </div>
    );
  }
}
