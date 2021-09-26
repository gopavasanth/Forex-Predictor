import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store";
import * as serviceWorker from "./serviceWorker";

// CORE root , required to set eventListener
window.helRoot = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  window.helRoot
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

{/* <div class="form-style-8">
<h2>Enter new transaction details</h2> */}
{/* <form> */}
  // <div class="input-group-prepend">
  //       <label class="input-group-text" for="inputGroupSelect01">Name</label>
  // </div>
  // <input type="text" name="company" labelInputText={this.state.company} changeHandler={this.changeHandler} placeholder="Company Name" />
  // <div class="input-group-prepend">
  //       <label class="input-group-text" for="inputGroupSelect01">Date</label>
  // </div>
  // <input type="date" name="date" placeholder="Date" id="start"
  //   min="2021-09-01" max="2021-10-31" labelInputText={this.state.date} changeHandler={this.changeHandler} />
  //   <div class="input-group mb-3">
  //     <div class="input-group-prepend">
  //       <label class="input-group-text" for="inputGroupSelect01">Status</label>
  //     </div>
  //     <select class="custom-select" name="status" labelInputText={this.state.status} changeHandler={this.changeHandler} id="inputGroupSelect01">
  //       <option selected>Status...</option>
  //       <option value="Pending">Pending</option>
  //       <option value="Completed">Completed</option>
  //       <option value="On hold">On hold</option>
  //       <option value="Cancelled">Cancelled</option>
  //     </select>
  //   </div>
  //   <div class="input-group-prepend">
  //       <label class="input-group-text" for="inputGroupSelect01">Price</label>
  //   </div>
  //   <input type="number" name="price" labelInputText={this.state.price}  placeholder="1050" />
  //   <input className="submitButton" type="submit" onClick={() => this.addItem()} />
{/* </form> */}
// </div>