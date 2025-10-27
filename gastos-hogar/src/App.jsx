import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import gastosData from './data/gastos.json'

// Componente para mostrar cada gasto individual
function GastoItem({ gasto, onDelete }) {
  return (
    <div className="gasto-item">
      <div className="gasto-info">
        <h3>{gasto.name}</h3>
      </div>
      <div className="gasto-actions">
        <span className="gasto-amount">${gasto.amount.toLocaleString()}</span>
        <button onClick={() => onDelete(gasto.id)} className="btn-delete">
          🗑️
        </button>
      </div>
    </div>
  )
}

// Componente formulario para agregar nuevos gastos
function GastoForm({ onAddGasto }) {
  const [nombre, setNombre] = useState('')
  const [monto, setMonto] = useState('')

  function manejarEnvio(e) {
    e.preventDefault()
    
    // Validar que ambos campos tengan valores
    if (nombre && monto) {
      const nuevoGasto = {
        id: nanoid(),
        name: nombre,
        amount: Number(monto)
      }
      onAddGasto(nuevoGasto)
      
      // Limpiar el formulario
      setNombre('')
      setMonto('')
    }
  }

  return (
    <form onSubmit={manejarEnvio} className="gasto-form">
      <input
        type="text"
        placeholder="Nombre del gasto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="input-nombre"
      />
      <input
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        className="input-monto"
      />
      <button type="submit" className="btn-add">
        ➕ Agregar
      </button>
    </form>
  )
}

// Componente principal
function App() {
  const [gastos, setGastos] = useState(gastosData)
  const [filtro, setFiltro] = useState('')

  // Filtrar gastos por nombre
  const gastosFiltrados = gastos.filter(gasto =>
    gasto.name.toLowerCase().includes(filtro.toLowerCase())
  )

  // Calcular el total de los gastos filtrados
  const total = gastosFiltrados.reduce((suma, gasto) => suma + gasto.amount, 0)

  // Función para agregar un gasto
  function agregarGasto(nuevoGasto) {
    setGastos([...gastos, nuevoGasto])
  }

  // Función para eliminar un gasto
  function eliminarGasto(id) {
    setGastos(gastos.filter(gasto => gasto.id !== id))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🏠 Mis Gastos del Hogar</h1>
      </header>

      <div className="container">
        {/* Input de filtro */}
        <div className="filtro-section">
          <input
            type="text"
            placeholder="🔍 Filtrar por nombre..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="input-filtro"
          />
        </div>

        {/* Formulario para agregar gastos */}
        <div className="form-section">
          <h2>Agregar nuevo gasto</h2>
          <GastoForm onAddGasto={agregarGasto} />
        </div>

        {/* Lista de gastos */}
        <div className="gastos-list">
          {gastosFiltrados.length > 0 ? (
            gastosFiltrados.map(gasto => (
              <GastoItem 
                key={gasto.id} 
                gasto={gasto} 
                onDelete={eliminarGasto}
              />
            ))
          ) : (
            <p className="no-gastos">No hay gastos que mostrar</p>
          )}
        </div>

        {/* Total de gastos */}
        <div className="total-section">
          <h2>Total: ${total.toLocaleString()}</h2>
        </div>
      </div>
    </div>
  )
}

export default App
