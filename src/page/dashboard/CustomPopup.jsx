import React, { Component, useState } from "react";
import Popup from 'reactjs-popup';

const CustomPopup = ({ newProps, newState, changeHandler }) => {

    function Text() {
        var style = {
          paddingTop: 5,
          margin: 5,
        };
        return (
          <div>
            <div style={style}> {newProps.label} </div>
            <input
              type="text"
              name={newProps.name}
              style={style}
              value={newProps.labelInputText}
              onChange={newProps.changeHandler}
            />
          </div>
        );
      }


    console.log(newProps)

    return (
        <Popup trigger={
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={(e) => this.modalOpen(e)}
            >
              <i className="fa fa-plus" /> New Transaction
            </button>
          } position="right center">
            <div className="customPopup">
              <div className="popup-form">
                <div
                  style={{
                    padding: "1px",
                    alignContent: "center",
                  }}
                >
                  <Text
                    label="date"
                    name="date"
                    labelInputText={newState.date}
                    changeHandler={changeHandler}
                  />
                  <Text
                    label="Company"
                    name="company"
                    labelInputText={newState.company}
                    changeHandler={changeHandler}
                  />
                  <Text
                    label="status"
                    name="status"
                    labelInputText={newState.status}
                    changeHandler={changeHandler}
                  />
                  <Text
                    label="price"
                    name="price"
                    labelInputText={newState.price}
                    changeHandler={changeHandler}
                  />
                  <input type="submit" value="submit" onClick={() => this.addItem()} />
                </div>
              </div>
            </div>
          </Popup>
    );
}

export default CustomPopup;