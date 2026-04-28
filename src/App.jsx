import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTask = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    setTasks([...tasks, { id: Date.now(), text: trimmed, completed: false }])
    setInputValue('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div className="container">
      <h1>タスクボード</h1>

      <div className="input-row">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="タスクを入力してください"
          className="task-input"
        />
        <button onClick={addTask} className="add-button">追加</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 && (
          <li className="empty">タスクがありません</li>
        )}
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="task-checkbox"
            />
            <span className="task-text">{task.text}</span>
            <button
              onClick={() => deleteTask(task.id)}
              className="delete-button"
              aria-label="削除"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
