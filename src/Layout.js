import React, { Component } from "react";
import autoBind from "react-autobind";
export default class Layout extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
    Array.prototype.shuffle = function(b) {
      var i = this.length,
        j,
        t;
      while (i) {
        j = Math.floor(i-- * Math.random());
        t =
          b && typeof this[i].shuffle !== "undefined"
            ? this[i].shuffle()
            : this[i];
        this[i] = this[j];
        this[j] = t;
      }
      return this;
    };
  }

  componentWillMount() {
    let plane = [];
    // let num = 1;

    for (let p = 0; p < 3; p++) {
      if (!plane[p]) {
        plane[p] = [];
      }
      for (let i = 0; i < 3; i++) {
        if (!plane[p][i]) {
          plane[p][i] = [];
        }
        let num = 1;
        for (let ind = 0; ind < 9; ind++) {
          if (!plane[p][i][ind]) {
            plane[p][i][ind] = [];
          }
          plane[p][i][ind] = num;
          num++;
        }
      }
    }

    this.setState({
      plane,
      motion: 0
    });
  }

  initPlane(plane) {
    let defaultArr = JSON.parse(JSON.stringify(plane));
    console.log("defaultArr: ", defaultArr);
    let newPlane = [];
    newPlane.push(plane[0].shuffle(true));
    newPlane.push(plane[1].shuffle(true));
    newPlane.push(plane[2].shuffle(true));

    console.log("plane.shuffle: ", newPlane);
    this.checkRandomQuantity();
    this.setState({ plane: newPlane, defaultArr });
  }
  getRandomNumber(max, min) {
    let quantity = Math.floor(Math.random() * (max - min)) + min;
    return quantity;
  }
  changeElement() {}
  render() {
    let plane = this.state.plane;
    let changeElement = this.changeElement;
    console.log("plane: ", plane);
    let motion = this.state.motion;

    return (
      <div className="layout">
        <h5>
          Количество ходов: <span>{motion}</span>
        </h5>
        <div className="container">
          <div className="row row_l">
            {plane.map(function(obj, i) {
              return (
                <div className={"layout_row row_" + i}>
                  {obj.map(function(cell, index) {
                    return (
                      <div className={"col col_" + index} ref={"col_" + index}>
                        {cell.map(function(ob, inn) {
                          return (
                            <div className={"div_inner di_" + inn}>
                              <input value={ob} onChange={changeElement} />
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => {
            this.initPlane(plane);
          }}
        >
          Перемешать
        </button>
      </div>
    );
  }
}
