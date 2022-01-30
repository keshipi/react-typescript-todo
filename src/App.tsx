import React, { useState } from 'react'

type Todo = {
  value: string
  readonly id: number
  checked: boolean
  removed: boolean
}
type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

function App() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')

  const handleOnSubmit = () => {
    if (!text) return

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false
    }

    setTodos([newTodo, ...todos])
    setText('')
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const handleOnEdit = (id: number, value: string) => {
    const deepCopy = todos.map((todo) => ({ ...todo }))
    const newTodos = deepCopy.map((todo) => {
      if(todo.id === id ) {
        todo.value = value
      }
      return todo
    })
    setTodos(newTodos)
  }
  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }))

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked
      }
      return todo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    })
    setTodos(newTodos)
  }
  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }))

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed
      }
      return todo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    })
    setTodos(newTodos)
  }
  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed)
    setTodos(newTodos)
  }
  const filterdTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed
      case 'checked':
        return todo.checked && !todo.removed!
      case 'unchecked':
        return !todo.checked && !todo.removed
      case 'removed':
        return todo.removed
      default:
        return todo
    }
  })

  return (
    <div>
      <select defaultValue="all" onChange={(e) => setFilter(e.target.value as Filter)}>
      <option value="all">全てのタスク</option>
      <option value="checked">完了した  タスク</option>
      <option value="unchecked">現在ののタスク</option>
      <option value="removed">ゴミ箱</option>
      </select>
      {filter === 'removed' ? (
        <button
          onClick={handleOnEmpty}
          disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ゴミ箱をからにする
        </button>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleOnSubmit()
          }}
        >
          <input
            type="text"
            value={text}
            onChange={(e) => handleOnChange(e)}
            disabled={filter === 'checked'}
          />
          <input
            type="submit"
            value="追加"
            onSubmit={handleOnSubmit}
            disabled={filter === 'checked'}
          />
        </form>
      )}
      <ul>
        {filterdTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleOnCheck(todo.id, todo.checked)}
                disabled={todo.removed}
              />
              <input
                type="text"
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
                disabled={todo.checked || todo.removed}
              />
              <button onClick={() => handleOnRemove(todo.id, todo.removed)}>{todo.removed ? '復元' : '削除'}</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
