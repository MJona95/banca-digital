
import Container from "@/app/components/container"
import Link from "next/link";

export default async function cuentasUser( context ) {

  const { id } = context.params;

  const res = await fetch(`http://localhost:5566/accounts/${id}`);
  const json = await res.json()
  console.log(json)
  
  return (
    <>
      <Container>
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 max-w-sm">
          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">
            Tipo de cuenta
          </p>
          <spam className="text-xl font-semibold text-gray-800 mb-3">
            {json.alias}
          </spam>
          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1 mt-3">
            Número de cuenta
          </p>
          <spam className="text-lg text-gray-700 font-mono mb-4">
            {json.account_number}
          </spam>
          <div className="flex items-center gap-2">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-3">
                Saldo disponible
              </p>
              <spam className="text-md font-semibold text-green-600">
                {json.balance}
              </spam>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mt-3 ml-4">
                Moneda
              </p>
              <spam className="text-md text-gray-600 ml-4">
                {json.currency}
              </spam>
            </div>
          </div>
        </div>

        <Link
            className='bg-blue-500 text-white py-1 px-5 rounded-lg inline-block mt-4'
            key='ir a cuentas'
            href={`/`}
          >
             Volver
          </Link>
      </Container>
    </>
  )
}
