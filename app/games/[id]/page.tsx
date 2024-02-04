import { Metadata } from "next";
import { GameDetail } from "../interfaces/game-detail";
import Image from "next/image"

interface IGame {
  params: { id: string }
}

export const generateMetadata = async ( {params}:IGame ):Promise<Metadata> =>  {

  const {name} = await getGame(params.id);

  return {
    title: `${name}`,
    description: 'Game Detail',
    keywords: 'Game Detail',
  }

}

const API_KEY = '808a24e3fa704791ac20f09380f91606'

const getGame = async ( id:string ): Promise<GameDetail> => {
  const data:GameDetail = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
   .then( res => res.json());
   return data;
}

const page= async( {params}:IGame ) => {

  const game = await getGame(params.id);

  return (
    <main className="h-screen">
      <h1>Game Detail {game.name} </h1>
      <Image
        src={game.background_image  }
        alt={game.name}
        width={600}
        height={400}
      />
    </main>
  )
  }
  
  export default page