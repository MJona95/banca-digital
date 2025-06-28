
function App() {

  const handleSendMessage = () => {
    // --- LLAMAMOS A LA FUNCIÓN EXPUESTA DESDE EL PRELOAD ---
    // Nota: Estamos asumiendo que el preload expone 'api' con 'sendTestMessage'
    // Si tu preload expone electronAPI en 'electron' y tu función está en 'api',
    // entonces sería window.api.sendTestMessage
    // Si la pones directamente en electronAPI sería window.electron.sendTestMessage
    // Voy a usar window.api, basándome en tu preload, ya que 'api' es tu Custom APIs.
    window.api.sendTestMessage('¡Hola Electron desde React!');
    setFeedback('Mensaje enviado al proceso principal.');
    console.log("Mensaje enviado desde el renderizador.");
  };


  return (
    <>
      <h1>hola mundo</h1>
      <button onClick={handleSendMessage}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '5px',
          border: '1px solid #007bff',
          backgroundColor: '#007bff',
          color: 'white',
          marginTop: '20px'
        }}>
        Enviar Mensaje de Prueba al Main
      </button>
    </>
  )
}

export default App
