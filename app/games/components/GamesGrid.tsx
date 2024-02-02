import Image from "next/image"
import { GameResponse, Result } from "../interfaces/games-response"
import { GameCard } from "./GameCard"


export const GamesGrid = ( { results }:GameResponse ) => {
  return (
    <div className="flex flex-wrap">
        {results.map( game => (
        <GameCard
            key={game.id}
            id={game.id}
            name={game.name}
            background_image={game.background_image}
            released={game.released}
        />
      ))
      }
    </div>
  )
}
