import React, {Component} from 'react'

class Keyboard extends Component {
  render () {
    return (
      <section>
        <h2>
          <small>Fretboard</small>
          <br />
          {this.props.title}
        </h2>
      </section>
    )
  }
}

export {Keyboard}
