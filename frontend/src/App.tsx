import { useEffect, useState } from 'react';
import GameCard from './GameCard.tsx';
import { DividerState, GameCardData } from './types.ts';
import {
  currentGameData,
  originalGameData,
  pickRandomAndReplenish,
  populateGameData,
  wait,
} from './utils.ts';

export default function App() {
  const [gameCardAData, setGameCardAData] = useState<GameCardData>();
  const [gameCardBData, setGameCardBData] = useState<GameCardData>();
  const [streak, setStreak] = useState(0);
  const [dividerState, setDividerState] = useState(DividerState.Or);

  useEffect(() => {
    const setGameCards = async () => {
      await populateGameData();
      setGameCardAData({
        ...pickRandomAndReplenish(),
        showCurrentPlayers: true,
      });
      setGameCardBData({
        ...pickRandomAndReplenish(),
        showCurrentPlayers: false,
      });
    };

    setGameCards();
  }, []);

  const handleClick = async (id: string) => {
    if (gameCardAData && gameCardBData) {
      const gameCardThatWasShowingCurrentPlayers =
        gameCardAData.showCurrentPlayers ? 'A' : 'B';

      console.log(currentGameData);
      setGameCardAData((prev) => ({
        ...prev!,
        showCurrentPlayers: true,
        disableButton: true,
      }));
      console.log(currentGameData);
      setGameCardBData((prev) => ({
        ...prev!,
        showCurrentPlayers: true,
        disableButton: true,
      }));

      const clickedGameCard =
        id === gameCardAData.id ? gameCardAData : gameCardBData;
      const otherGameCard =
        id === gameCardAData.id ? gameCardBData : gameCardAData;
      if (clickedGameCard.currentPlayers >= otherGameCard.currentPlayers) {
        setDividerState(DividerState.Tick);
        setStreak((prev) => prev + 1);
        await wait(2000);
        setDividerState(DividerState.Or);
        if (gameCardThatWasShowingCurrentPlayers === 'A') {
          setGameCardAData((prev) => {
            return {
              ...prev!,
              ...pickRandomAndReplenish(),
              showCurrentPlayers: false,
            };
          });
        } else {
          setGameCardBData((prev) => ({
            ...prev!,
            ...pickRandomAndReplenish(),
            showCurrentPlayers: false,
          }));
        }
      } else {
        setDividerState(DividerState.Cross);
        await wait(2000);
        setDividerState(DividerState.Or);
        setStreak(0);
        setGameCardAData({
          ...gameCardAData,
          ...pickRandomAndReplenish(),
          showCurrentPlayers: true,
        });
        setGameCardBData({
          ...gameCardBData,
          ...pickRandomAndReplenish(),
          showCurrentPlayers: false,
        });
      }
      setGameCardAData((prev) => ({
        ...prev!,
        disableButton: false,
      }));
      setGameCardBData((prev) => ({
        ...prev!,
        disableButton: false,
      }));
    }
  };

  if (gameCardAData && gameCardBData) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="max-w-5xl px-8">
          <span className="mb-8 block text-center text-4xl font-bold text-gray-900 vertical:mb-2 vertical:text-base">
            Score: {streak}
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
