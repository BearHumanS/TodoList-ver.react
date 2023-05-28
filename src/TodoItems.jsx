import React, { useState, useRef } from 'react'
import './TodoItems.css'

export default function TodoItems({
  setInputVal,
  createTodo,
  setTitleInputVals,
  updateTodo,
  titleInputVals,
  inputVal,
  todos,
  deleteTodo
}) {
  const [focusedItemId, setFocusedItemId] = useState(null)
  const inputRef = useRef(null)

  const handleInputChange = e => {
    setInputVal(e.target.value)
  }

  const handleButtonClick = () => {
    createTodo()
  }

  const handleEnter = e => {
    if (e.key === 'Enter') {
      createTodo()
    }
  }

  const handleEditInput = (e, id) => {
    const value = e.target.value
    const updatedTitleInputVals = { ...titleInputVals }
    updatedTitleInputVals[id] = value
    setTitleInputVals(updatedTitleInputVals)
  }

  const handleEditInputChange = async (e, id) => {
    const value = e.target.value
    if (value.trim() === '') {
      alert('값을 입력해주세요.')
      return
    }

    const titleTodo = todos.find(todo => todo.id === id)
    if (titleTodo.title === value) {
      setFocusedItemId(null)
      return
    }

    const updatedTodo = { ...titleTodo, title: value }
    await updateTodo(id, updatedTodo)
    setFocusedItemId(null)
  }

  const sortCreatedAt = (a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt)
  }

  return (
    <div className="todo-container">
      <div className="title">
        <input
          className="title-input"
          type="text"
          value={inputVal}
          onChange={handleInputChange}
          onKeyDown={handleEnter}
        />
        <button onClick={handleButtonClick}>Add</button>
      </div>
      <ul className="list">
        {todos.sort(sortCreatedAt).map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={async () => {
                const updatedTodo = { ...todo, done: !todo.done }
                await updateTodo(todo.id, updatedTodo)
              }}
            />
            <input
              ref={inputRef}
              className="edit-input"
              type="text"
              value={
                titleInputVals[todo.id] !== undefined
                  ? titleInputVals[todo.id]
                  : todo.title
              }
              onChange={e => handleEditInput(e, todo.id)}
              onBlur={e => handleEditInputChange(e, todo.id)}
              onFocus={() => setFocusedItemId(todo.id)}
            />
            <span style={{ color: todo.done ? 'blue' : 'red' }}>
              {todo.done ? '수행' : '진행'}
            </span>
            <div>
              <span>생성일</span>: {new Date(todo.createdAt).toLocaleString()}
            </div>
            <div>
              <span>수정일</span>: {new Date(todo.updatedAt).toLocaleString()}
            </div>
            {focusedItemId === todo.id ? <span>💾</span> : <span>✍️</span>}
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
