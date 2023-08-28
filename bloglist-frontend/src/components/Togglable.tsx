import { useState, forwardRef, useImperativeHandle, ReactNode} from 'react'
import PropTypes from 'prop-types'

export type VisibilityHandle = {
  toggleVisibility: () => void
}

const Togglable = forwardRef(({ buttonLabel, children } : {buttonLabel: string, children: ReactNode}, refs) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <div style={hideWhenVisible} >
        <button onClick={toggleVisibility} >{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} >
        {children}
        <button onClick={toggleVisibility} >cancel</button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}