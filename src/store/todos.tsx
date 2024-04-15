// context api
// createContext stores all the imp data in it
// provide provides the date to components which they want
// instead of consumer we using useContext , which helps to consume or use the data
// Context api contains Createcontext,provider,Consumer all are used to communicate data without passing through all components btw them
import { ReactNode, createContext, useContext, useState } from "react";

// creating a type for children so that ts doesnt give error
// here reactnode can be any component of react
export type TodosProviderProps = {
    children : ReactNode
}

// here giving the todo a structure type required for ts
export type Todo = {
    id: string;
    task:string;
    completed:boolean;
    createdAt:Date;
}

// the context or the data used to share betweem the files
export type TodosContext = {
    todos:Todo[];
    // we also be having function with param task and return void to add data to settodo
    handleAddToDo:(task:string) => void;  // also called as call signature 
    toggleTodoAsCompleted:(id:string)=>void;
    handleDeleteTodo:(id:string)=>void;
}


// saying createContext will either have value of type TodosContext or null value
export const todosContext = createContext<TodosContext | null>(null)

// provides data to others , children is basically main app in this case
// and hence we have to wrap the main app with the TodosProvider
export const TodosProvider = ({children}:TodosProviderProps) => {

    // its saying todos will have Todo data type array
    // since if we refresh the page we want the local storage as initial array
    // const[todos,setTodos] = useState<Todo[]>([]) // before we were initializing empty array 
    const[todos,setTodos] = useState<Todo[]>(()=>{
        try{
            // try getting local storage if not then get empty array as string as both will be string to parse later
            const newTodos = localStorage.getItem('todos') || "[]";
            return JSON.parse(newTodos) as Todo[]
        }catch{
            return []
        }
    })

    // Adding a todo element , using setTodos setter
    const handleAddToDo = (task:string) => {
        setTodos(
            // here prev has th previous value of 
            (prev)=>{
                const newTodos:Todo[] = [
                {
                    id:Math.random().toString(),
                    task:task,
                    completed:false,
                    createdAt:new Date()
                },
                ...prev
                ]
                // console.log("previous data",prev)
                // console.log(newTodos);
                localStorage.setItem('todos',JSON.stringify(newTodos))
                return newTodos
            }
        )
    }


    // mark completed
    const toggleTodoAsCompleted = (id:string) => {
        setTodos((prev)=>{
            let newTodos = prev.map((todo)=>{
                if(todo.id === id ){
                    // below code uses spread operator to specify 
                    // to keep all values of todo type/struct same and change 
                    // toggle completed field only
                    return {... todo , completed:!todo.completed}
                } 
                return todo;
            })
            localStorage.setItem('todos',JSON.stringify(newTodos))
            return  newTodos;
        })
    }

    // deleting the todo element
    const handleDeleteTodo = (id:string) => {
        setTodos((prev)=>{
                //filter out todos without the current id
                let newTodos = prev.filter(
                    (filterTodo) => filterTodo.id !== id
                );
                localStorage.setItem('todos',JSON.stringify(newTodos))
                return newTodos;
            }
        )
    }


    // provider returning the required variables/functions
    return <todosContext.Provider value={{todos,handleAddToDo,toggleTodoAsCompleted,handleDeleteTodo}}>
        {children}
    </todosContext.Provider>
}

// consumer or usecontextapi

export const useTodos = () => {
    const todosConsumer = useContext(todosContext);
    // if we forgot to wrap the provider
    if(!todosConsumer){
        throw new Error('useTodos used outside of Provider')
    }
    return todosConsumer
}
