import Image from "next/image";
import { Result } from "../games/interfaces/games-response";
import Link from "next/link";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";


export const GameCard = ({ id, name, background_image, released }: Result) => {
  return (
    // <div key={id} classNameName="flex flex-col">
    //   <h2>{name}</h2>
    //   <Image
    //     src={background_image}
    //     alt={name}
    //     width={100}
    //     height={100}
    //     objectFit="cover"
    //   />
    //   <p>{released.toString()}</p>
    // </div>

    <div className="mx-auto right-0 mt-2 w-60">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="flex flex-col justify-center gap-2 text-center p-5 bg-gray-800 border-b w-full h-56 overflow-hidden rounded-lg">
           <Image
                className="h-28 w-full text-white rounded-3xl mx-auto"
                src={background_image}
                alt={name}
                width={300}
                height={300}
                priority={false}
                
            />
            <Link
                href={`/games/${id}`}
                className="text-lg font-semibold text-gray-50 hover:text-lime-200 transition-all duration-300 ease-in-out hover:scale-105 transform hover:font-bold"
            >
                <p className="">{name} </p>
            </Link>
        </div>
        <div className="border-b">
          <Link
            className="px-4 py-2 hover:bg-gray-100 flex"
            href="/account/campaigns"
          >
            <div className="text-green-600">
              <CiCalendarDate size={25} />
            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
              {released.toString()}
              </p>
              <p className="text-xs text-gray-500">Released date</p>
            </div>
          </Link>
          <Link
            className="px-4 py-2 hover:bg-gray-100 flex"
            href="/account/donations"
          >
            <div className="text-red-600">
              <FaRegHeart size={25}/>
            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
                Favorite
              </p>
              <p className="text-xs text-gray-500">Add to favorite</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
