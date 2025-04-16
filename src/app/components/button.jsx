import Link from "next/link"

export default function button({text, ruta, keyprop}) {
  return (
    <>
        <Link
            className='bg-blue-500 text-white py-1 px-5 rounded-lg inline-block mt-4'
            key={keyprop}
            href={ruta}
        >  
            {text}
        </Link>
    </>
  )
}