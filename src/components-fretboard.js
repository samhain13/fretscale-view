import React, {Component} from 'react'

class Fretboard extends Component {
    render () {
        return (
          <section>
            <h2>
              <small>Keyboard</small>
              <br />
              {this.props.title}
            </h2>
          </section>
        )
    }
}

export {Fretboard}
