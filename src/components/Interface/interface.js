import React from 'react'

const Interface = ({ content }) => {
  return (
    <div className="Interface">
      <article className="results">results:
        <div>
          {content.length
            ? content
            : 'null'
          }
        </div>
      </article>
    </div>
  )
}

export default Interface
