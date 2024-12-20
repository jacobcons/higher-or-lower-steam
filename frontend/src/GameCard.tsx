import { GameCardData } from './types.ts';
import { useEffect, useState } from 'react';

export default function GameCard({
  id,
  name,
  currentPlayers,
  showCurrentPlayers,
  disableButton = false,
  handleClick,
}: GameCardData & { handleClick: (id: string) => void }) {
  const [imageNotFound, setImageNotFound] = useState(false);

  const formattedCurrentPlayers = currentPlayers.toLocaleString();

  useEffect(() => {
    setImageNotFound(false);
  }, [id]);
  const src = imageNotFound
    ? 'steam.png'
    : `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${id}/header.jpg`;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-3 lg:gap-y-6 vertical:gap-y-2">
      <h2 className="text-center text-3xl font-bold text-gray-900 vertical:text-base">
        {name}
      </h2>

      <img
        src={src}
        onError={() => setImageNotFound(true)}
        alt=""
        className="w-[420px] vertical:w-[220px]"
      />

      <p className="text-xl text-gray-700 vertical:text-sm">
        Current players:{' '}
        <span className="font-extrabold">
          {showCurrentPlayers && formattedCurrentPlayers}
        </span>
      </p>

      <button
        type="button"
        className="me-2 inline-flex items-center gap-x-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-base font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 vertical:px-2.5 vertical:py-1.5 vertical:text-xs"
        onClick={() => handleClick(id)}
        disabled={disableButton}
      >
        <span>Higher</span>
        <span className="text-xl vertical:text-base">⬆️</span>
      </button>
    </div>
  );
}
