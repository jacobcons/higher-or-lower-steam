import { useEffect, useState } from 'react';
import GameCard from './GameCard.tsx';
import { DividerState, GameCardData, ModalState } from './types.ts';
import {
  currentGameData,
  originalGameData,
  pickRandom,
  populateGameData,
  resetGameData,
  wait,
} from './utils.ts';

export default function App() {
  const [gameCardAData, setGameCardAData] = useState<GameCardData>();
  const [gameCardBData, setGameCardBData] = useState<GameCardData>();
  const [score, setScore] = useState(0);
  const [dividerState, setDividerState] = useState(DividerState.Or);
  const [modalState, setModalState] = useState(ModalState.Hide);

  // fetch game data and populate the two cards
  useEffect(() => {
    const setGameCards = async () => {
      await populateGameData();
      setGameCardAData({
        ...pickRandom(),
        showCurrentPlayers: true,
        disableButton: false,
      });
      setGameCardBData({
        ...pickRandom(),
        showCurrentPlayers: false,
        disableButton: false,
      });
    };

    setGameCards();
  }, []);

  // handle users guess
  const handleClick = async (id: string) => {
    if (gameCardAData && gameCardBData) {
      const gameCardThatWasShowingCurrentPlayers =
        gameCardAData.showCurrentPlayers ? 'A' : 'B';

      // reveal player count
      setGameCardAData((prev) => ({
        ...prev!,
        showCurrentPlayers: true,
        disableButton: true,
      }));
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
        // correct guess => replace game card that was showing current player initially with new one
        setDividerState(DividerState.Tick);
        const newScore = score + 1;
        setScore(newScore);

        await wait(2000);

        setDividerState(DividerState.Or);
        if (newScore === originalGameData.length - 1) {
          setModalState(ModalState.Win);
        } else if (gameCardThatWasShowingCurrentPlayers === 'A') {
          setGameCardAData((prev) => ({
            ...prev!,
            ...pickRandom(),
            showCurrentPlayers: false,
          }));
        } else {
          setGameCardBData((prev) => ({
            ...prev!,
            ...pickRandom(),
            showCurrentPlayers: false,
          }));
        }

        setGameCardAData((prev) => ({
          ...prev!,
          disableButton: false,
        }));
        setGameCardBData((prev) => ({
          ...prev!,
          disableButton: false,
        }));
      } else {
        // incorrect guess => lose modal
        setDividerState(DividerState.Cross);

        await wait(2000);

        setModalState(ModalState.Lose);
      }
    }
  };

  const resetGame = () => {
    setDividerState(DividerState.Or);
    setScore(0);
    resetGameData();
    setGameCardAData({
      ...pickRandom(),
      showCurrentPlayers: true,
      disableButton: false,
    });
    setGameCardBData({
      ...pickRandom(),
      showCurrentPlayers: false,
      disableButton: false,
    });
    setModalState(ModalState.Hide);
  };

  if (gameCardAData && gameCardBData) {
    return (
      <>
        <div className="flex h-screen w-full items-center justify-center">
          <div className="max-w-5xl px-8">
            <h1 className="mb-8 block text-center text-4xl font-bold text-gray-900 vertical:mb-2 vertical:text-base">
              Score: {score}
            </h1>
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

        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`fixed bottom-0 left-0 right-0 top-0 z-50 max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-800/50 md:inset-0 ${modalState === ModalState.Hide ? 'hidden' : 'flex'}`}
        >
          <div className="relative max-h-full w-full max-w-2xl p-4">
            <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
              <div className="flex flex-col items-center p-20">
                <h1 className="mb-12 block text-center text-4xl font-bold text-gray-900">
                  You {modalState === ModalState.Win ? 'win' : 'lose'}!
                </h1>
                <h2 className="mb-12 block text-center text-3xl font-bold text-gray-900">
                  {modalState === ModalState.Lose ? (
                    <>Final score: {score}</>
                  ) : (
                    'You guessed all games correctly!'
                  )}
                </h2>
                <button
                  type="button"
                  className="me-2 inline-flex items-center gap-x-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-base font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
                  onClick={resetGame}
                >
                  <span>Play again</span>
                  <span className="text-xl vertical:text-base">🔄</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
