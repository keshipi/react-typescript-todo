import { useReducer } from 'react'
import { reducer } from './reducer'
import { initialState } from './initialState'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleOnSubmit = () => {
    dispatch({ type: 'submit' })
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'change', text: e.target.value })
  }
  const handleOnEdit = (id: number, value: string) => {
    dispatch({ type: 'edit', id, value })
  }
  const handleOnCheck = (id: number, checked: boolean) => {
    dispatch({ type: 'check', id, checked })
  }
  const handleOnRemove = (id: number, removed: boolean) => {
    dispatch({ type: 'remove', id, removed })
  }
  const handleOnEmpty = () => {
    dispatch({ type: 'empty' })
  }
  const handleOnFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'filter', filter: e.target.value as Filter });
  };

  const filteredTodos = state.todos.filter((todo) => {
    switch (state.filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <div>
      <select defaultValue="all" onChange={handleOnFilter}>
        <option value="all">全てのタスク</option>
        <option value="checked">完了した  タスク</option>
        <option value="unchecked">現在ののタスク</option>
        <option value="removed">ゴミ箱</option>
      </select>
      {state.filter === 'removed' ? (
        <button
          onClick={handleOnEmpty}
          disabled={state.todos.filter((todo) => todo.removed).length === 0}
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
            value={state.text}
            onChange={(e) => handleOnChange(e)}
            disabled={state.filter === 'checked'}
          />
          <input
            type="submit"
            value="追加"
            onSubmit={handleOnSubmit}
            disabled={state.filter === 'checked'}
          />
        </form>
      )}
      <ul>
        {filteredTodos.map((todo) => {
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
