import React, { Component } from "react";
import autoBind from "react-autobind";
export default class Layout extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }

  componentWillMount() {
    let plane = [];
    let num = 1;

    for (let p = 0; p < 9; p++) {
      if (!plane[p]) {
        plane[p] = [];
      }
      for (let i = 0; i < 3; i++) {
        if (!plane[p][i]) {
          plane[p][i] = [];
        }
        for (let ind = 0; ind < 3; ind++) {
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
  render() {
    let plane = this.state.plane;
    let position = this.state.position;
    let clickElement = this.clickElement;
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
                      <input
                        className={"col col_" + index + " s_" + cell}
                        ref={"col_" + index}
                        value={cell}
                        onClick={clickElement}
                      />
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
