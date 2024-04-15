import AddToDo from './components/Addtodo'
import Navbar from './components/navbar'
import Todos from './components/todos'

function App() {


  return (
    <main>
      <h1>TODO REACT + TYPESCRIPT</h1>
      <Navbar/>
      <AddToDo />
      <Todos/>
    </main>
  )
}

export default App
