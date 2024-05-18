'use client';

import { useEffect, useState, useCallback } from 'react';

interface HarryPotterChars {
  name: string;
  // adicione outros campos conforme necessário
}

interface PageDetailProps {
  params: {
    id: string;
  };
}

function CharacterDetailPage({ params }: PageDetailProps) {
  const [data, setData] = useState<HarryPotterChars[]>([]);

  const fetchAllData = useCallback(async () => {
    const url = `https://hp-api.onrender.com/api/character/${params.id}`;
    const options = {
      method: 'GET',
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      fetchAllData();
    }
  }, [params.id, fetchAllData]);

  return (
    <div>
      {data && (
        <div>
          <h1 className='text-red-800'>{data.name}</h1>
        </div>
      )}
      <h2>Nao veio nenhum resultado</h2>
    </div>
  );
}

export default CharacterDetailPage;