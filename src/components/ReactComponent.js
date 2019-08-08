import React, { Component } from 'react'

class ReactComponent extends Component {
  render() {
    return (
      <div ref={e => (this.reff = e)} onClick={() => alert('ishaan')}>
        ishaan here
      </div>
    )
  }
}

export default ReactComponent
