import { Dispatch, memo } from 'react'

type Props = {
  dispatch: Dispatch<Action>
}

export const EmptyButton = memo((props: Props) => {
  const handleOnEmpty = () => {
    props.dispatch({ type: 'empty' })
  }
  return <button onClick={handleOnEmpty}>ゴミ箱を空にする</button>
})

EmptyButton.displayName = 'EmptyButton'
