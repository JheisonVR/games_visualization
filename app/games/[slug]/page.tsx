import { Metadata } from "next";
import { GameDetail } from "../interfaces/game-detail";
import Image from "next/image"
import { notFound } from "next/navigation";

interface IGame {
  params: { slug: string }
}

export const generateMetadata = async ( {params}:IGame ):Promise<Metadata> =>  {

  try{
    const {name} = await getGame(params.slug);
  
    return {
      title: `${name}`,
      description: `Game Detail ${name}`,
    }
  } catch(error){
    return {
      title: `Game Detail`,
      description: `Game Detail`,
    }
  }

}

const API_KEY = '808a24e3fa704791ac20f09380f91606'

const getGame = async ( slug:string ): Promise<GameDetail> => {
  try{
    const data:GameDetail = await fetch(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`)
     .then( res => res.json());
     return data;
  }catch(error){
    notFound(); 
  }
}

const page= async( {params}:IGame ) => {


  const game = await getGame(params.slug);

  return (
    <div className="flex mt-5 flex-col items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-2 mb-8 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{game.id} {game.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={game.background_image ?? ''}
              width={600}
              height={400}
              alt={`Imagen del pokemon ${game.name}`}
              className="mb-5"
            />


            <div className="flex flex-wrap">
              {
                game.genres.map(genre => (
                  <p key={genre.id} className="mr-2 p-3 capitalize border border-s-indigo-50 rounded-md">{genre.name}</p>
                ))
              }
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Platforms</p>
            <div className="text-base font-medium text-navy-700 flex flex-wrap">
              {
                game.platforms.map(platform => (
                  <p key={platform.platform.id} className="mr-2 capitalize">|{platform.platform.name}|</p>
                ))
              }
            </div>
          </div>

          <div className="flex justify-around items-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <span className="text-base font-medium text-navy-700 flex">
                {
                  game.rating
                }
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Class</p>
              <span className="text-base font-medium text-navy-700 flex">
                {
                  game.esrb_rating?.name
                }
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600 mb-2 font-semibold">Images</p>
            <div className="flex justify-around">

              <Image
                src={game.background_image}
                width={100}
                height={100}
                alt={`sprite ${game.name}`}
              />

              <Image
                src={game.background_image_additional}
                width={100}
                height={100}
                alt={`sprite ${game.name}`}
              />

            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600 font-semibold mb-2">publishers</p>
            <div className="flex justify-center items-center">
              
              <Image
                src={game.publishers[0].image_background}
                width={100}
                height={100}
                alt={`sprite ${game.name}`}
              />
              <p className="text-sm text-navy-700 flex mx-1 my-2">
                {game.publishers[0].name}
              </p>
            </div>
          </div>



        </div>
        <div className="relative flex flex-col items-center rounded-[20px]  mx-auto bg-white bg-clip-border shadow-lg p-3 my-2">
          <h1 className="font-semibold mb-2">Description</h1>
          <p> {game.description_raw} </p>
        </div>
      </div>
    </div>
  );
  }
  
  export default page