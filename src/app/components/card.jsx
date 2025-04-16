
import Image from 'next/image';

import Button from './button';

export default function card({ userData, userId }) {

  const { full_name, profile_photo } = userData

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 max-w-sm">
        <div className="flex items-center gap-4">
          {profile_photo ? (
            <Image
              className="rounded-full object-cover w-16 h-16"
              src={profile_photo}
              alt="imagen del usuario"
              width={64}
              height={64}
            />
          ) : (
            <div className="rounded-full w-16 h-16 bg-gray-200 flex items-center justify-center">
              <span className="text-sm text-gray-500">Sin foto</span>
            </div>
          )}
          <div className="flex flex-col flex-1">
            <h2 className="text-lg font-semibold text-gray-800">{full_name == '' ? 'cargando..' : full_name }</h2>
            <div className="mt-2 self-end">

              <Button keyprop='ir a cuentas' ruta={`/cuentas/${userId}`} text='Ir a cuentas' />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

