import { useState } from 'react';
import TodoForm from './TodoForm'
function App() {
  const [todo, setTodo] = useState([{
    text: "Like",
    isCompleted: false
  },{
    text: "Comment",
    isCompleted: false
  },{
    text: "Subscribe",
    isCompleted: false
  }]);
  const [isActive, setIsActive] = useState([]);

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
  return (
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
        <TodoForm addTask={addTask} />
        </div>
    </div>
  );
}

export default App;
