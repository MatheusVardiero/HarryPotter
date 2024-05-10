"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";

import { useState, useEffect } from "react";

interface HarryPotterChars {
  id: string,
  name: string,
  alternate_names: string[],
  species: string,
  gender: string;
  house: string,
  dateOfBirth: Date,
  yearOfBirth: number,
  wizard: boolean,
  eyeColour: string,
  hairColour: string,
  wand: string[]
  hogwartsStudent: boolean,
  hogwartsStaff: boolean,
  actor: string,
  alive: boolean,
  image: string,
}

const url = 'https://hp-api.onrender.com/api/characters';
const options = {
  method: 'GET'
};

const Characters: React.FC = () => {

  const [data, setData] = useState<HarryPotterChars[]>([]);
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);
  //const router = useRouter();

  // Função para lidar com o clique em um personagem
  //const handleCharacterClick = (id: string) => {
  // Redirecionar para a página do personagem com o ID como parâmetro
  //router.push(`/character/${id}`);
  //};

  const handleHouseSelection = (house: string) => {
    setSelectedHouse(house);
    document.getElementById("chars")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  async function fetchAllData() {    
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
  }

  useEffect(() => {
    fetchAllData()
  },[])

  return(
    <>
      <div className="py-10 text-center">
        <h1 className="text-[1.8em] font-semibold">Choose The House</h1>
      </div>

      <div className='grid grid-cols-4 gap-5 mb-10'>
        <Link href={'#chars'} className="border p-4 shadow-md" onClick={() => handleHouseSelection("Gryffindor")}>
          <Image
            className='w-full' 
            width={200}
            height={92}
            src='/logo-gryffindor.png'
            alt={'Gryffindor'}         
          />
        </Link>
        <Link href={'#chars'} className="border p-4 shadow-md" onClick={() => handleHouseSelection('Slytherin')}>
          <Image
            className='w-full' 
            width={200}
            height={92}
            src='/logo-slytherin.png'
            alt={'Slytherin'}         
          />
        </Link>
        <Link href={'#chars'} className="border p-4 shadow-md" onClick={() => handleHouseSelection('Ravenclaw')}>
          <Image
            className='w-full' 
            width={200}
            height={92}
            src='/logo-ravenclaw.png'
            alt={'Ravenclaw'}         
          />
        </Link>
        <Link href={'#chars'} className="border p-4 shadow-md" onClick={() => handleHouseSelection('Hufflepuff')}>
          <Image
            className='w-full' 
            width={200}
            height={92}
            src='/logo-huffepuff.png'
            alt={'Huffepuff'}         
          />
        </Link>
      </div>

      <div className="mb-10">
        {selectedHouse && (
          <div id='chars' className="py-10 text-center">
            <h1 className="text-[1.8em] font-semibold">Characters</h1>
          </div>
        )}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          {data && 
            data.filter(item => item.house === selectedHouse && item.image).map(chars => (
              <>
                <Link key={chars.id} href={`/pages/characters/${chars.id}`} className="border shadow-md">
                  <Image
                    className='w-full h-[400px]'
                    width={200}
                    height={92}
                    src={chars.image}
                    alt={chars.name}         
                  />
                  <div className='px-4 py-2'>
                    <p><b>Name:</b> {chars.name}</p>
                    <p><b>Actor Name:</b> {chars.actor}</p>
                    <p><b>Specie:</b> {chars.species.charAt(0).toUpperCase() + chars.species.slice(1)}</p>
                    <p><b>Hogwart Student:</b> {chars.hogwartsStudent ? 'Yes' : 'No'}</p>
                    <p><b>Hogwart Staff:</b> {chars.hogwartsStaff ? 'Yes' : 'No'}</p>
                  </div>
                </Link>
              </>
              )
            )
          }
        </div>
      </div>
    </>
  )
}

export default Characters;