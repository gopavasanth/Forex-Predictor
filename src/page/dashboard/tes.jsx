import React, { Component, useState } from "react";
import { Col, Row, Form, InputGroup, FormControl, Button, Dropdown } from "react-bootstrap";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import Header from "src/component/dashboard/header";
import Info from "src/component/dashboard/info";
import { Box, BoxHeader, BoxBody } from "src/component/dashboard/box";
import { UPDATE_SIDEBAR_LIST } from "src/store/type";
import MyTable from "src/component/dashboard/table";
import { connect } from "react-redux";
import { API, API_KEY } from "../../config";

import { cloneDeep } from "lodash";
import * as agCharts from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";
import Modal from "./Modal";
var axios = require("axios");
const data = require("./data");

const dataTable = {
  header: ["Hedging ID", "Date", "Company", "Status", "Price", ""],
  body: [
    [
      <button className="link-button a">#5832</button>,
      "2020/04/08",
      <button className="link-button a">Google</button>,
      <span className="label label-warning">On hold</span>,
      <span dangerouslySetInnerHTML={{ __html: "&dollar; 923.93" }} />,
      <button className="link-button a">
        <span className="fa-stack">
          <i className="fa fa-square fa-external-link fa-stack-2x" />
          <i className="fa fa-external-link fa-stack-1x fa-inverse" />
        </span>
      </button>,
    ],
    [
      <button className="link-button a">#8002</button>,
      "2020/03/18",
      <button className="link-button a">Robert Bosch</button>,
      <span className="label label-success">Completed</span>,
      <span dangerouslySetInnerHTML={{ __html: "&dollar; 825.50" }} />,
      <button className="link-button a">
        <span className="fa-stack">
          <i className="fa fa-square fa-external-link fa-stack-2x" />
          <i className="fa fa-external-link fa-stack-1x fa-inverse" />
        </span>
      </button>,
    ],
    [
      <button className="link-button a">#2547</button>,
      "2020/02/04",
      <button className="link-button a">TCS</button>,
      <span className="label label-info">Pending</span>,
      <span dangerouslySetInnerHTML={{ __html: "&dollar; 1625.50" }} />,
      <button className="link-button a">
        <span className="fa-stack">
          <i className="fa fa-square fa-external-link fa-stack-2x" />
          <i className="fa fa-external-link fa-stack-1x fa-inverse" />
        </span>
      </button>,
    ],
    [
      <button className="link-button a">#9274</button>,
      "2020/02/07",
      <button className="link-button a">Infosys</button>,
      <span className="label label-danger">Cancelled</span>,
      <span dangerouslySetInnerHTML={{ __html: "&dollar; 3534" }} />,
      <button className="link-button a">
        <span className="fa-stack">
          <i className="fa fa-square fa-external-link fa-stack-2x" />
          <i className="fa fa-external-link fa-stack-1x fa-inverse" />
        </span>
      </button>,
    ],
    [
      <button className="link-button a">#8463</button>,
      "2020/03/15",
      <button className="link-button a">MR. Cooper</button>,
      <span className="label label-success">Completed</span>,
      <span dangerouslySetInnerHTML={{ __html: "&dollar; 4199.99" }} />,
      <button className="link-button a">
        <span className="fa-stack">
          <i className="fa fa-square fa-external-link fa-stack-2x" />
          <i className="fa fa-external-link fa-stack-1x fa-inverse" />
        </span>
      </button>,
    ],
  ],
};

function Text(props) {
  var style = {
    paddingTop: 5,
    margin: 5,
  };
  return (
    <div>
      <div style={style}> {props.label} </div>
      <input
        type="text"
        name={props.name}
        style={style}
        value={props.labelInputText}
        onChange={props.changeHandler}
      />
    </div>
  );
}

function TableFormList(props) {
  return (
    <table>
      <tr>
        {props.headers.map((items, index) => (
          <th key={index}>{items}</th>
        ))}
      </tr>
      <tbody>
        {props.formElements.map((item, index) => (
          <tr key={index}>
            <button className="link-button a">{item.id}</button>, {item.date},
            <button className="link-button a">{item.company}</button>,
            <span className="label label-warning">{item.company}</span>,
            <span
              dangerouslySetInnerHTML={{ __html: `&dollar; ${item.price}` }}
            />
            ,
            <button className="link-button a">
              <span className="fa-stack">
                <i className="fa fa-square fa-external-link fa-stack-2x" />
                <i className="fa fa-external-link fa-stack-1x fa-inverse" />
              </span>
            </button>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

class Tes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      id: 5832,
      date: "20/02/2021",
      company: "New Company",
      status: "Pending",
      price: 100,
      items: [
        [5832, "2020/04/08", "Google", "On hold", 923.93],
        [5832, "2020/04/08", "Google", "On hold", 923.93],
        [5832, "2020/04/08", "Google", "On hold", 923.93],
        [5832, "2020/04/08", "Google", "On hold", 923.93],
      ],
      USD_INR: 0,
      EUR_INR: 0,
      Y_USD_INR: 0,
      Y_EUR_INR: 0,
      dataTable: dataTable,
      options: {
        autoSize: true,
        data: data,
        title: {
          text: "Currency Forcaster",
          fontSize: 18,
        },
        subtitle: {
          text: "Forcasted from SAP Solutions",
        },
        series: [
          {
            type: "line",
            xKey: "date",
            yKey: "dollar",
            stroke: "#01c185",
            marker: {
              stroke: "#01c185",
              fill: "#01c185",
            },
          },
          {
            type: "line",
            xKey: "date",
            yKey: "euro",
            stroke: "#000000",
            marker: {
              stroke: "#000000",
              fill: "#000000",
            },
          },
        ],
        axes: [
          {
            position: "bottom",
            type: "time",
            tick: { count: agCharts.time.month.every(2) },
            title: { text: "Date" },
          },
          {
            position: "left",
            type: "number",
            title: { text: "Price in pence" },
          },
        ],
      },
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addItem(dataTable) {
    var id = this.state.id;
    var date = this.state.date;
    var company = this.state.company;
    var status = this.state.status;
    var price = this.state.price;
    var elements = this.state.items.slice();
    elements.push({
      id: id,
      date: date,
      company: company,
      status: status,
      price: price,
    });
    this.setState({
      items: elements,
      id: id + 1,
      date: "",
      company: "New Company",
      status: "Pending",
      price: "",
    });
  }

  deleteItem(item) {
    return () => {
      this.setState((prevState) => ({
        dataTable: prevState.dataTable.filter(
          (dataTable) => dataTable.item !== item
        ),
      }));
    };
  }

  getData() {
    console.log(dataTable);
  }
  
  componentDidMount() {
    this.getData();
    console.log(this.state.dataTable);

    fetch(`${API}?q=USD_INR,EUR_INR&compact=ultra&apiKey=${API_KEY}`)
      .then((response) => response.json())
      .then((res) => {
        var USD_INR = res.USD_INR;
        var EUR_INR = res.EUR_INR;
        this.setState({
          USD_INR: USD_INR,
          EUR_INR: EUR_INR,
        });
      });

    var date = new Date();
    date.setDate(date.getDate() - 1);
    var month = date.getMonth() + 1;
    var d = date.getDate();
    var ydate =
      date.getFullYear() +
      "-" +
      (month < 10 ? "0" : "") +
      month +
      "-" +
      (d < 10 ? "0" : "") +
      d;
    // console.log(ydate);

    fetch(
      `${API}?q=USD_INR,EUR_INR&compact=ultra&date=${ydate}&apiKey=${API_KEY}`
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(ydate, res.USD_INR[ydate]);
        var Y_USD_INR = res.USD_INR[ydate];
        var Y_EUR_INR = res.EUR_INR[ydate];
        this.setState({
          Y_USD_INR: Y_USD_INR,
          Y_EUR_INR: Y_EUR_INR,
        });
      });
  }

  componentWillMount() {
    this.props.dispatch({
      type: UPDATE_SIDEBAR_LIST,
      value: [
        {
          iconClassname: "fa fa-dashboard",
          link: "",
          name: "Dashboard",
          itung: 8,
        },
        // {iconClassname:'fa fa-table',link:'',name:'Sample 1',
        //   submenu:[
        //     {link:'sample.html',name:'Sample 2',pesan:'new'},
        //     {link:'sample2.html',name:'Sample 3'},
        //   ]
        // },
        {
          iconClassname: "fa fa-weixin",
          link: "chat",
          name: "Support",
          pesan: { klass: "label-warning", teks: "new" },
        },
      ],
    });
    const theme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("theme", theme);
  }

  modalOpen() {
    this.setState({ modal: true });
  }

  modalClose() {
    this.setState({
      modalInputName: "",
      modal: false,
    });
  }

  componentWillMount() {
    this.props.dispatch({
      type: UPDATE_SIDEBAR_LIST,
      value: [
        {
          iconClassname: "fa fa-dashboard",
          link: "",
          name: "Dashboard",
          itung: 8,
        },
        // {iconClassname:'fa fa-table',link:'',name:'Sample 1',
        //   submenu:[
        //     {link:'sample.html',name:'Sample 2',pesan:'new'},
        //     {link:'sample2.html',name:'Sample 3'},
        //   ]
        // },
        {
          iconClassname: "fa fa-weixin",
          link: "chat",
          name: "Support",
          pesan: { klass: "label-warning", teks: "new" },
        },
      ],
    });
    const theme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("theme", theme);
  }

  onThemeSwitch() {
    const currentTheme = document.body.getAttribute("theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.body.setAttribute("theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  render() {
    const data = {
      listInfo: [
        {
          iconClassname: "fa fa-user red-bg",
          headline: "User ID",
          value: 5130,
        },
        {
          iconClassname: "fa fa-hand-o-up emerald-bg",
          headline: "Hedges",
          value: 5,
        },
        {
          iconClassname: "fa fa-money green-bg",
          headline: "Total Amount",
          value: "8400",
          symbol: "&#36;",
        },
        {
          iconClassname: "fa fa-eye yellow-bg",
          headline: "Monthly Visits",
          value: 39,
        },
      ],
      //==========================================================================

      listInfo2: [
        {
          value: "1 USD = " + this.state.USD_INR + "₹",
          headline: "INR ",
          progress: this.state.USD_INR,
          className:
            this.state.USD_INR >= this.state.Y_USD_INR ? "green-bg" : "red-bg",
          subinfo: [
            {
              iconDesc:
                this.state.USD_INR > this.state.Y_USD_INR
                  ? "fa fa-arrow-circle-o-up"
                  : "fa fa-arrow-circle-o-down",
              desc:
                this.state.USD_INR > this.state.Y_USD_INR
                  ? "+" +
                    (this.state.USD_INR - this.state.Y_USD_INR).toFixed(5) +
                    " than prev day"
                  : (this.state.USD_INR - this.state.Y_USD_INR).toFixed(5) +
                    " than prev day",
            },
          ],
        },
        {
          value: "1 Euro = " + this.state.EUR_INR + "₹",
          headline: "INR",
          progress: this.state.EUR_INR,
          className:
            this.state.EUR_INR >= this.state.Y_EUR_INR ? "green-bg" : "red-bg",
          subinfo: [
            {
              iconDesc:
                this.state.EUR_INR > this.state.Y_EUR_INR
                  ? "fa fa-arrow-circle-o-up"
                  : "fa fa-arrow-circle-o-down",
              desc:
                this.state.EUR_INR > this.state.Y_EUR_INR
                  ? "+" +
                    (this.state.EUR_INR - this.state.Y_EUR_INR).toFixed(5) +
                    " than prev day"
                  : (this.state.EUR_INR - this.state.Y_EUR_INR).toFixed(5) +
                    " than prev day",
            },
            // {iconDesc:'fa fa-globe',desc:'84.912 last week'},
          ],
        },
        // { value:'1 Shekal = 22.283₹',headline:'INR',progress:'22%',className:'emerald-bg',
        //   subinfo:[
        //     {iconDesc:'fa fa-arrow-circle-o-up',desc:'15% higher than last week'},
        //     // {iconDesc:'fa fa-shopping-cart',desc:'8 new orders'},
        //   ]
        // },
      ],
    };

    const listInfo = data.listInfo.map((value, k) => {
      return (
        <div key={`firstInfo-${k}`} className="col-lg-3 col-sm-6 col-xs-12">
          <Info {...value} />
        </div>
      );
    });

    const listInfo2 = data.listInfo2.map((val, k) => {
      return (
        <div key={`secondInfo-${k}`} className="col-md-4 col-sm-6 col-xs-12">
          <div className={"main-box small-graph-box " + val.className}>
            <span className="value">{val.value}</span>
            <span className="headline">{val.headline}</span>
            <div className="progress">
              <div
                style={{ width: val.progress }}
                role="progressbar"
                className="progress-bar"
              >
                <span className="sr-only">{val.progress} Complete</span>
              </div>
            </div>
            {val.subinfo && val.subinfo.length > 0
              ? val.subinfo.map((val2, kk) => {
                  return (
                    <span key={`subinfo-${k}-${kk}`} className="subinfo">
                      <i className={val2.iconDesc} /> {val2.desc}
                    </span>
                  );
                })
              : null}
          </div>
        </div>
      );
    });

    return (
      <div>
        <Header title="Dashboard" />
        {/* <div>
            <button className="btn btn-primary dark-theme-switch float-right" style={{padding: "1px", float: "center"}}
            onClick={this.onThemeSwitch.bind(this)}>Dark Theme </button>
            <div class='theme-switch-inner'></div>
        </div> */}

        {listInfo}

        {listInfo2}

        {/* <div
          style={{
            padding: "1px",
            alignContent: "center",
            border: "1px solid black",
          }}
        >
          <Text
            label="date"
            name="date"
            labelInputText={this.state.date}
            changeHandler={this.changeHandler}
          />
          <Text
            label="Company"
            name="company"
            labelInputText={this.state.company}
            changeHandler={this.changeHandler}
          />
          <Text
            label="status"
            name="status"
            labelInputText={this.state.status}
            changeHandler={this.changeHandler}
          />
          <Text
            label="price"
            name="price"
            labelInputText={this.state.price}
            changeHandler={this.changeHandler}
          />
          <input type="submit" value="submit" onClick={() => this.addItem()} />
          <div>
            <TableFormList
              className="table table-hover"
              style={{ padding: "1px" }}
              headers={["ID", " Date", " Company", " Status", " Price"]}
              formElements={this.state.items}
            />
          </div>
        </div>
 */}
        <div class="col-xs-12">
          <div
            class="col-xs-6"
            style={{
              height: "350px",
              float: "right",
              paddingBottom: "10px",
            }}
          >
            <AgChartsReact options={this.state.options} />
          </div>
          <div
            class="col-xs-6"
            style={{
              height: "350px",
              float: "right",
              paddingBottom: "10px",
            }}
          >
            <h2>Hot News</h2>
            <ul class="l-news">
              <li class="l-news__content p-news__content">
                <div class="l-news__content__day p-news__content__day">
                  2021.06.01
                </div>
                <div class="l-news__content__label p-news__content__label">
                  NEWS
                </div>
                <div class="l-news__content__text p-news__content__text">
                  Worlds Trading Day!
                </div>
              </li>
              <li class="l-news__content p-news__content">
                <div class="l-news__content__day p-news__content__day">
                  2021.06.01
                </div>
                <div class="l-news__content__label p-news__content__label">
                  NEWS
                </div>
                <div class="l-news__content__text p-news__content__text">
                  US Govt Changes its policies
                </div>
              </li>
              <li class="l-news__content p-news__content">
                <div class="l-news__content__day p-news__content__day">
                  2021.06.01
                </div>
                <div class="l-news__content__label p-news__content__label">
                  NEWS
                </div>
                <div class="l-news__content__text p-news__content__text">
                  USA Supports Israel Economic Trades
                </div>
              </li>
            </ul>
          </div>
        </div>
        <br />

        <div className="col-xs-12">
          <Box>
            <BoxHeader>
              <h2 className="pull-left" style={{ padding: "5px" }}>
                Predict
              </h2>
              <hr />
              <BoxBody style={{ padding: "5px" }}>
                <form class="needs-validation" novalidate>
                  <div class="form-row">
                    <div class="col-md-2 mb-3">
                      <select
                        className="custom-select"
                        style={{ padding: "5px" }}
                      >
                        <option selected>Base currency</option>
                        <option value="1">Dollar</option>
                        <option value="2">Euro</option>
                      </select>
                    </div>
                    <div class="col-md-2 mb-3">
                      <select
                        className="custom-select"
                        style={{ padding: "5px" }}
                      >
                        <option selected>Target currency</option>
                        <option value="1">INR</option>
                      </select>
                    </div>
                    <div class="input-group col-md-2 mb-4">
                    <input type="date" id="start" name="trip-start"
                        min="2021-09-01" max="2021-10-31"/>
                    </div>
                    <br />
                    <div class="col-md-2 mb-4">
                      <button className="btn btn-primary">
                        <i className="fa" /> Predict
                      </button>
                    </div>
                  </div>
                </form>
              </BoxBody>
            </BoxHeader>
          </Box>
        </div>

        <div className="col-xs-12">
          <Box>
            <BoxHeader>
              <h2 className="pull-left">Transactions</h2>
              <div className="filter-block pull-right">
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={(e) => this.modalOpen(e)}
                >
                  <i className="fa fa-plus" /> New Transaction
                </button>
                <Modal
                  show={this.state.modal}
                  handleClose={(e) => this.modalClose(e)}
                >
                  <h2>Hello Modal</h2>
                </Modal>
                <div className="form-group pull-left">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <i className="fa fa-search search-icon" />
                </div>
                <button className="btn btn-primary pull-right" disabled>
                  <i className="fa fa-eye fa-lg" /> View all Transaction{" "}
                </button>
              </div>
            </BoxHeader>

            <BoxBody>
              <MyTable
                className="table table-hover"
                {...this.state.dataTable}
              />
            </BoxBody>
          </Box>
        </div>
      </div>
    );
  }
}
export default connect()(Tes);
