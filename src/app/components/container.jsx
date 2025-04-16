import React from 'react'

//componente para heredar las clases del contenedor y evitar el codigo repetitivo 
//ademas se pueden pasar mas clases como propiedades en caso sea necesario con la variable clasName
export default function container({children, className}) {

  const containerClass = `max-w-screen-md mx-auto my-12 p-4 sm:px-6 lg:px-8 ${className}`;

  return (
    <div className={containerClass}>
        {children}
    </div>
  )
}
