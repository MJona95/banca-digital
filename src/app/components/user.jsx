"use client"

import React, { useEffect, useState } from 'react';
import useStore from '@/stores/useStore';

import Container from './container';
import Card from './card';

export default function user() {

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
  }, [data])

  return (
    <>
        <Container>
            <h1 className='text-center text-xl font-bold max-w-md mx-auto'>Usuarios</h1>
            <div className='flex gap-2.5 mt-5'>
              <Card userData={userData} userId={userId}  /> 
            </div>
        </Container>
    </>
  )
}
