import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import './grid.css';

const ReactGridLayout = WidthProvider(RGL);

const totalItems = [1,2,3,4];

class BasicLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: 6
  };

  constructor(props) {
    super(props);

    this.state = {
      items: {},
      newCounter: totalItems.length
    };

    this.onAddItem = this.onAddItem.bind(this);
  }

  componentDidMount() {
    localStorage.length === 0 ?
    this.setState({
      items: totalItems.map(function(i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 1,
          h: 1,
          add: i === (list.length - 1).toString()
        };
      })
    }) : this.setState({
      items: getFromLS('rgl', 'layout')
    })
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el}>
        {el.add ? (
          <span
            className="add text"
            onClick={this.onAddItem}
            title="You can add an item by clicking here, too."
          >
            Add +
          </span>
        ) : (
          <span className="text">{i}</span>
        )}
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  onAddItem() {
    const newCounterState = this.state.newCounter + 1;
    this.setState({
      items: this.state.items.concat({
        i: `${newCounterState}`,
        x: (this.state.items.length*2) % (this.state.cols ||12),
        y: Infinity,
        w: 1,
        h: 1
      }),
      newCounter: newCounterState
    })
  }

  onLayoutChange = (layout) => {
    this.setState({
      items: layout
    })
    saveToLS('layout',layout)
  }

  render() {
    const generatedLayout = this.state.items;
    return (
      <React.Fragment>
        <button onClick={this.onAddItem}>Add</button>
        <ReactGridLayout
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          {...this.props}
        >
        {_.map(generatedLayout, el => this.createElement(el))}
        </ReactGridLayout>
      </React.Fragment>
    );
  }
}

//save layout to local storage
function saveToLS(key, value) {
  localStorage.setItem(
    "rgl",
    JSON.stringify({
      [key]: value
    })
  )
}

//get layout from local storage
function getFromLS(key, prop) {
  let ls = {};
  if(localStorage) {
    try {
      ls = JSON.parse(localStorage.getItem(key)) || {};
    } catch(e) {

    }
  }
  return ls[prop]
}

export default BasicLayout;