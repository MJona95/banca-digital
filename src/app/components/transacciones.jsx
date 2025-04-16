
export default async function transacciones({idUser}) {

    const res = await fetch(`http://localhost:5566/accounts/${idUser}/transactions`);
    const json = await res.json()
    console.log(json.items)
    const transacciones = json.items
    console.log(transacciones[0].transaction_name)

    const titleClass = "text-xs text-gray-800 uppercase tracking-wide font-medium mt-3 ml-4";
    const paragraphClass = "text-xs text-gray-600 uppercase tracking-wide font-medium mt-1 ml-4"

  return (
    <>
        <div className="">
            {
                transacciones.map(transaccion => (
                    <div className="">
                        {/* aqui se podria crear un componente ya que todas los campos tienen el mismo formato*/}
                        <h2 className={titleClass}>Numero de la transaccion</h2>
                        <p className={paragraphClass}>{transaccion.transaction_number}</p>
                        <h2 className={titleClass}>Descripcion</h2>
                        <p className={paragraphClass} >{transaccion.bank_description}</p>
                        <h2 className={titleClass}>Cuenta Debitada</h2>
                        <p className={paragraphClass} >{transaccion.origin}</p>
                        <h2 className={titleClass}>Cuenta a depositar</h2>
                        <p className={paragraphClass} >{transaccion.destination}</p>
                        <h2 className={titleClass}>Tipo de transaccion</h2>
                        {/* aqui se podria hacer un ternario y cuando transaction_type sea == a credit 
                            se escribiria cretido eso podria mejorar la interpretacion de la informacion 
                            a como aparece actualmente daria cierto confusion  */}
                        <p className={paragraphClass} >{transaccion.transaction_type}</p>
                    </div>
                ))
            }
        </div>
    </>
  )
}
