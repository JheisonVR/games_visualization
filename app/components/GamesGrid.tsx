import Image from "next/image"
import { GameResponse, Result } from "../games/interfaces/games-response"
import { GameCard } from "./GameCard"


export const GamesGrid = ( { results }:GameResponse ) => {
  return (
    <div className="flex flex-wrap">
      {results && results.map( game => (
        <GameCard
          key={game.id}
          id={game.id}
          slug={game.slug}
          name={game.name}
          background_image={game.background_image}
          released={game.released}
        />
      ))}
    </div>
  )
}
