import React from 'react'
// import App from '../../App'

const History = ({content}) => {
  console.log('----content history----',content)
  return (
    <div className="History">
      <p>This is the history of REST calls made with RESTy</p>
      <ul>
      {content.map(call => {
        return (
          <li>
            { call }
          </li>
        )
      })}
    </ul>
    </div>
  )
}

export default History
