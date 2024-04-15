import { FormEvent, useState } from "react"
import { useTodos } from "../store/todos"

const AddToDo = () => {


    const[todo,setTodo] = useState("")
    // accessing the handleAddToDo function  from the context api
    const{handleAddToDo} = useTodos();


    // FormEvent<HTMLFormElement> checked by checking handleFormSubmit type in the main code
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      // prevent default of form
      e.preventDefault()

      // function to add to
      handleAddToDo(todo)
      setTodo("")
    }

  return (
    <form onSubmit={(handleFormSubmit)}>
      {/* e.target.value taking value */}
        <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)}></input>
        <button type='submit'>Add</button>
    </form>
  )
}

export default AddToDo