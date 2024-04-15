import { useTodos } from '../store/todos'
import { useSearchParams } from 'react-router-dom';

const Todos = () => {

  // accessing the todos array from the context api
  const {todos,toggleTodoAsCompleted,handleDeleteTodo} = useTodos();

  const [searchPrams] = useSearchParams();
  let todosData = searchPrams.get("todos")
//   console.log("file ",todosData)

  let filterData = todos;

  // show data where completed is false , can also be written as !task.completed
  if (todosData==='active'){
    filterData = filterData.filter((task)=> task.completed!=true)
  }else if(todosData==='completed'){
    filterData = filterData.filter((task)=> task.completed)
  }
  
  // show data where completed is true


    return (
        <ul className='main-task'>
            {   
                //lopping
                filterData.map(
                    (todo)=>{
                        return <li key={todo.id}>
                            <input type="checkbox" id={`todo-${todo.id}}`} 
                                checked={todo.completed} onChange={()=> toggleTodoAsCompleted(todo.id)}
                            />
                            <label htmlFor="todo-${todo.id}}">{todo.task}</label>
                            {/* This {}  syntax indicates js running in html , below run only when todo.completed is true*/}
                            {
                                todo.completed && (
                                    <button type='button' onClick={()=> handleDeleteTodo(todo.id)}>
                                    Delete</button>
                                )
                            }
                        </li>
                    }
                )
            }
        </ul>
  )
}

export default Todos