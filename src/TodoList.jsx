import React, { useEffect, useState, useRef } from 'react'
import TodoService from './TodoService'
import Todos from './Todos'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [inputVal, setInputVal] = useState('')
  const [titleInputVals, setTitleInputVals] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const todosData = await TodoService.getTodos()
    setTodos(todosData)
    setLoading(false)
  }

  const createTodo = async () => {
    if (inputVal.trim() === '') {
      alert('일정을 입력해주세요.')
      return
    }

    const newTodo = await TodoService.createTodo(inputVal)
    if (newTodo) {
      setTodos([...todos, newTodo])
      setInputVal('')
      setTitleInputVals({ [newTodo.id]: newTodo.title })
    }
  }

  const updateTodo = async (id, updatedTodo) => {
    const updatedTodoData = await TodoService.updateTodo(id, updatedTodo)
    if (updatedTodoData) {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? updatedTodoData : todo
      )
      setTodos(updatedTodos)
    }
  }

  const deleteTodo = async id => {
    if (confirm('삭제할까요?')) {
      await TodoService.deleteTodo(id)
      const updatedTodos = todos.filter(todo => todo.id !== id)
      setTodos(updatedTodos)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <>
      <Todos
        titleInputVals={titleInputVals}
        setInputVal={setInputVal}
        setTitleInputVals={setTitleInputVals}
        createTodo={createTodo}
        updateTodo={updateTodo}
        todos={todos}
        inputVal={inputVal}
        deleteTodo={deleteTodo}
      />
    </>
  )
}

export default TodoList
