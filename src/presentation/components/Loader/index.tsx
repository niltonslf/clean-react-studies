import React from 'react'
import './loader-styles.scss'

const Loader: React.FC<React.HtmlHTMLAttributes<HTMLElement>> = (props) => {
  return (
    <div {...props} className={['loader', props.className].join(' ')}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loader
