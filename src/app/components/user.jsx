/*"use client"*/

/*import React, { useEffect, useState } from 'react';*/
/*import useStore from '@/stores/useStore';*/

import Container from './container';
import Card from './card';

export default async function user() {

  const userId = 1134948394;

  const res = await fetch (`http://localhost:5566/users/${userId}`);
  const json = await res.json();

  /*

  aqui estaba intentando traer los datos como si fuera un componente estatico de react 
  con ayuda de zustand para mantener el estado de la aplicacion pero leyendo la documentacion de 
  next pude convertirlo esperar con asycn await hasta el momento de tener la informacion iy 
  poderlo renderizar funciona pero se debe usar use client al comienzo del componente

  const [userData, setUserData] = useState({full_name: '', profile_photo: '', });

  const {data, loading, error, fetchData} = useStore();

  const userId = 1134948394;

  const apiUrl = `http://localhost:5566/users/${userId}`;

  useEffect(() => {
    fetchData(apiUrl)
  }, [fetchData, apiUrl]);

  useEffect(() => {
    if (!!data) {
      setUserData(data)
    }
  }, [data]) */

  return (
    <>
        <Container>
            <h1 className='text-center text-xl font-bold max-w-md mx-auto'>Usuarios</h1>
            <div className='flex gap-2.5 mt-5'>
              <Card userData={json} userId={userId}  /> 
            </div>
        </Container>
    </>
  )
}
