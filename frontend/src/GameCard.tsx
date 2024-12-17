import { GameData } from './types.ts';

export default function GameCard({ id, name, currentPlayers }: GameData) {
  return (
    <div className="flex h-screen w-1/2 flex-col items-center justify-center gap-y-6">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        {name}
      </h2>
      <img
        src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${id}/header.jpg`}
        alt=""
      />
      <p className="text-xl text-gray-600">Current players: {currentPlayers}</p>
    </div>
  );
}
