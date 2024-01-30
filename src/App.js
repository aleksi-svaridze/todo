import { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  let [newBooleanArray, setNewBooleanArray] = useState([]);

  const handleSubmitedValue = (e) => {
    // Prevent page from reloading
    e.preventDefault();

    // Check input value
    if(inputValue.trim() !== '') {
      setTasks([...tasks, {id: Math.random(), content: inputValue, completed: false}]);
    } else {
      alert('Enter valid text')
    }

    // Reset input value after submitting form
    setInputValue('');
  }
  const handleCompleteTask = (index) => {
    let newTasksArray = [...tasks];
    newTasksArray[index].completed = !newTasksArray[index].completed;
    setTasks(newTasksArray);
  }

  useEffect(() => {
    setNewBooleanArray(tasks.filter( task => !task.completed ).length)
  }, [tasks])

  return (
    <div className="todo-app">
      <h2>Pending tasks ({newBooleanArray})</h2>

      <ul>
        {
           tasks && tasks.map((task, index) => ( 
              <li key={task.id}>
                <p 
                  className="task-content" 
                  style={{textDecoration: task.completed && "line-through"}}>
                    {task.content}
                </p>

                <p className="settings">
                  <span 
                    className="complete" 
                    onClick={() => handleCompleteTask(index)}>complete</span>
                  <span 
                    className="delete" 
                    onClick={() => setTasks(tasks.filter(item => item.id !== task.id))}>
                      x
                  </span>
                </p>
              </li>
           ))
        }
      </ul>

      <form 
      onSubmit={(e) => handleSubmitedValue(e)}
      >
        <input 
          type="text" 
          placeholder="Add a new task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
        />
      </form>
    </div>
  );
}
export default App;