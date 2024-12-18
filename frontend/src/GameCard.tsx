import { GameData } from './types.ts';
import { useState } from 'react';

export default function GameCard({ id, name, currentPlayers }: GameData) {
  const [noHeaderImage, setNoHeaderImage] = useState(false);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-3 lg:gap-y-6">
      <h2 className="text-center text-3xl font-bold text-gray-900">{name}</h2>

      {!noHeaderImage && (
        <img
          src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${id}/header.jpg`}
          onError={() => setNoHeaderImage(true)}
          alt=""
          className="w-[460px]"
        />
      )}
      {noHeaderImage && (
        <div className="flex aspect-[460/215] w-[460px] items-center justify-center bg-gray-900 text-6xl font-bold text-white">
          ?
        </div>
      )}
      <p className="text-xl text-gray-700">Current players: </p>

      <button
        type="button"
        className="me-2 inline-flex items-center gap-x-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-base font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
      >
        <span>Higher</span>
        <span className="text-xl">⬆️</span>
      </button>
    </div>
  );
}
