import TodoItems from './TodoItems'

function Todos({
  setInputVal,
  createTodo,
  setTitleInputVals,
  updateTodo,
  titleInputVals,
  inputVal,
  todos,
  deleteTodo
}) {
  return (
    <>
      <TodoItems
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
export default Todos
