import { useEffect, useState } from 'react';
import TodoForm from './TodoForm'
function App() {
  const [todo, setTodo] = useState([]);
  const [isActive, setIsActive] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [limit, setLimit] = useState(5)

  const addTask = text => setTodo([...todo, { text }]);
  const checkTodo = (index) => {
    if (isActive.indexOf(index) > -1) {
      setIsActive((prev) => prev.filter((i) => i !== index));
   } else {
    setIsActive((prev) => [...prev, index]);
   }
  }

  const removeTodo = (i) => {
    const newTodo = [...todo]
    newTodo.splice(i,1)
    setTodo(newTodo)
  }

  const checkSelect = (e) => {
    setLimit(e.target.value)
  }

  useEffect(() => {
    const url = `https://fakestoreapi.com/users?limit=${limit}`;
    const fetchData = async() => {
      try {
        const response = await fetch(url)
        const json = await response.json()
        const username = json.map((data, i) => {
          return {'text': `${data.name.firstname+' '+data.name.lastname}`}
        })
        setTodo(username)
        setLoading(false)
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchData()
  }, [limit, setLimit])
  return isLoading ? 'Loading...' :  (
    <div className="App">
      <div className="todo-list">
        {todo.map((task, index) => (
            <div className="todo" key={index}>
              <input type="checkbox" onChange={() => checkTodo(index)} />
                {task.text}
              &nbsp;&nbsp;<button onClick={() => removeTodo(index)}>Remove</button>
            </div>
        ))}
        <h2>You have chosen {isActive.length} items out of {todo.length}</h2>
        <select defaultValue={5} onChange={(e) => checkSelect(e)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <TodoForm addTask={addTask} />
        </div>
    </div>
  );
}

export default App;
