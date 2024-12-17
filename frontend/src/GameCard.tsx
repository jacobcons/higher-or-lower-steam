import { GameData } from './types.ts';
import { useState } from 'react';

export default function GameCard({ id, name, currentPlayers }: GameData) {
  const [noHeaderImage, setNoHeaderImage] = useState(false);

  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-y-6 lg:h-screen lg:w-1/2">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        {name}
      </h2>
      {!noHeaderImage && (
        <img
          src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${id}/header.jpg`}
          onError={() => setNoHeaderImage(true)}
          alt=""
        />
      )}
      {noHeaderImage && (
        <div className="flex aspect-[460/215] w-[460px] max-w-full items-center justify-center bg-gray-900 text-6xl font-bold text-white">
          ?
        </div>
      )}
      <p className="text-xl text-gray-600">Current players: </p>
    </div>
  );
}
