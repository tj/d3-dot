
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Chart from '../index'
import Tip from 'd3-tipy'
import offset from 'offset'
import d3 from 'd3'

const gen = n => {
  const data = []

  for (var i = n; i; i--) {
    data.push({
      bin: new Date(Date.now() - (i * 3600000)),
      value: Math.random() * 5 | 0
    })
  }

  return data
}

class App extends Component {
  componentDidMount() {
    const tip = new Tip({
      format: d => d3.format(',')(d.value)
    })

    this.a = new Chart({
      target: this.refs.a,
      mouseover: tip.show,
      mouseout: tip.hide
    })

    this.b = new Chart({
      target: this.refs.b,
      width: 200,
      height: 80,
      size: [2, 4],
      mouseover: tip.show,
      mouseout: tip.hide
    })

    this.c = new Chart({
      margin: { top: 0, right: 40, bottom: 50, left: 40 },
      target: this.refs.c,
      axisPadding: 20,
      barPadding: 1,
      tickSize: 3,
      size: [2, 30],
      mouseover: tip.show,
      mouseout: tip.hide,
      // axis: false,
      type: 'bar'
    })

    this.a.render(gen(24))
    this.b.render(gen(10))
    this.c.render(gen(80))
  }

  componentDidUpdate() {
    this.changeData()
  }

  changeData = _ => {
    const n = Math.max(15, Math.random() * 30 | 0)
    this.a.update(gen(n))
    this.b.update(gen(10))
    this.c.update(gen(150))
  }

  render() {
    return <div>
      <div id="actions">
        <button onClick={this.changeData}>Animate</button>
      </div>

      <section>
        <h3>Defaults</h3>
        <p>Chart default settings.</p>
        <svg ref="a" className="chart"></svg>
      </section>

      <section>
        <h3>Small</h3>
        <p>Chart with a smaller size.</p>
        <svg ref="b" className="chart"></svg>
      </section>

      <section>
        <h3>Kitchen Sink</h3>
        <p>Chart with most settings configured.</p>
        <svg ref="c" className="chart"></svg>
      </section>
    </div>
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
