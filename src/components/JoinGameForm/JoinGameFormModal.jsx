import React from 'react'

function Modal({closeModal}) {
  return(
    <div>
      <div>
        <h2>Esperando a que el anfitrion inicie la partida</h2>
        <h3>Quieres salir?</h3>
        <button onClick={closeModal}>Salir</button>    
      </div>
    </div>
  )
}

export default Modal;