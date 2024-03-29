import Image from "next/image";
import { GameResponse } from "./interfaces/games-response";
import { GamesGrid } from "../components";
import { notFound } from "next/navigation";

const API_KEY = '808a24e3fa704791ac20f09380f91606'

const getGames = async ( page_size=40 ) => {
  try{
    const data:GameResponse = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=${page_size}`)
     .then( res => res.json());
     const games = data.results
     return games;

  } catch(error){
    notFound(); 
  }

}

const page = async () => {

  const games = await getGames();

  return (
    <div className="flex flex-col">
      <GamesGrid results={games} />
      
    </div>
  )
}

export default page