import React ,{Component} from 'react'
import Header from 'src/component/dashboard/header'
import Info from 'src/component/dashboard/info'
import {
  Box,
  BoxHeader,
  BoxBody
} from 'src/component/dashboard/box'
import {
  UPDATE_SIDEBAR_LIST
} from 'src/store/type'
import MyTable from 'src/component/dashboard/table'
import {connect} from 'react-redux'
var axios = require('axios');

class Tes extends Component{
    state = {
        USD_INR: 0,
        EUR_INR: 0,
        Y_USD_INR: 0,
        Y_EUR_INR: 0
    }

  componentDidMount() {
      fetch('https://free.currconv.com/api/v7/convert?q=USD_INR,EUR_INR&compact=ultra&apiKey=288cbf1d87dd0e7d91c5')
          .then((response) => response.json())
          .then(res => {
              var USD_INR = res.USD_INR;
              var EUR_INR = res.EUR_INR;
              this.setState({
                USD_INR : USD_INR,
                EUR_INR : EUR_INR
               });
      });
    
    var date = new Date();
    date.setDate(date.getDate()-1);
    var month = (date.getMonth()+1)
    var ydate = date.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + date.getDate();
    // console.log(ydate);

      fetch(`https://free.currconv.com/api/v7/convert?q=USD_INR,EUR_INR&compact=ultra&date=${ydate}&apiKey=288cbf1d87dd0e7d91c5`)
          .then((response) => response.json())
          .then(res => {
              var Y_USD_INR = res.USD_INR[ydate];
              var Y_EUR_INR = res.EUR_INR[ydate];
              this.setState({
                Y_USD_INR : Y_USD_INR,
                Y_EUR_INR : Y_EUR_INR
               });
      });
  }

  componentWillMount()
  {
    this.props.dispatch({
      type:UPDATE_SIDEBAR_LIST,
      value:[
        {iconClassname:'fa fa-dashboard',link:'',name:'Dashboard',itung:8},
        // {iconClassname:'fa fa-table',link:'',name:'Sample 1',
        //   submenu:[
        //     {link:'sample.html',name:'Sample 2',pesan:'new'},
        //     {link:'sample2.html',name:'Sample 3'},
        //   ]
        // },
        {iconClassname:'fa fa-weixin',link:'chat',name:'Support',pesan:{klass:'label-warning',teks:'new'}},
      ]
    })
      const theme = localStorage.getItem('theme') || 'light';
       document.body.setAttribute('theme', theme);
  }

    onThemeSwitch(){
      const currentTheme = document.body.getAttribute('theme');
      const newTheme = (currentTheme === 'light') ? 'dark' : 'light';

      document.body.setAttribute('theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }

  render(){

  const data = {
    listInfo:[
      {iconClassname:'fa fa-user red-bg',headline:'User ID',value:5130},
      {iconClassname:'fa fa-hand-o-up emerald-bg',headline:'Hedges',value:5},
      {iconClassname:'fa fa-money green-bg',headline:'Total Amount',value:'8400',symbol:'&#36;'},
      {iconClassname:'fa fa-eye yellow-bg',headline:'Monthly Visits',value:39},
    ],
    //==========================================================================
    listInfo2:[
      { value: "1 USD = " + this.state.USD_INR+ '₹',headline:'INR ',progress:this.state.USD_INR,className: this.state.USD_INR > this.state.Y_USD_INR ? 'green-bg' : 'red-bg',
        subinfo:[
          {
              iconDesc: this.state.USD_INR > this.state.Y_USD_INR ? 'fa fa-arrow-circle-o-up': 'fa fa-arrow-circle-o-down' ,desc:
              this.state.USD_INR > this.state.Y_USD_INR ? '+' + (this.state.USD_INR - this.state.Y_USD_INR).toFixed(5) + ' than prev day' : (this.state.USD_INR - this.state.Y_USD_INR ).toFixed(5) + ' than prev day'  
          },
        ]
      },
      { value:'1 Euro = ' + this.state.EUR_INR +'₹' ,headline:'INR',progress:this.state.EUR_INR,className: this.state.EUR_INR > this.state.Y_EUR_INR ? 'green-bg' : 'red-bg',
        subinfo:[
          {
             iconDesc: this.state.EUR_INR > this.state.Y_EUR_INR ? 'fa fa-arrow-circle-o-up': 'fa fa-arrow-circle-o-down', desc: 
              this.state.EUR_INR > this.state.Y_EUR_INR ? '+'+(this.state.EUR_INR - this.state.Y_EUR_INR).toFixed(5) + ' than prev day' : (this.state.EUR_INR - this.state.Y_EUR_INR ).toFixed(5) + ' than prev day'  
          },
          // {iconDesc:'fa fa-globe',desc:'84.912 last week'},
        ]
      },
      // { value:'1 Shekal = 22.283₹',headline:'INR',progress:'22%',className:'emerald-bg',
      //   subinfo:[
      //     {iconDesc:'fa fa-arrow-circle-o-up',desc:'15% higher than last week'},
      //     // {iconDesc:'fa fa-shopping-cart',desc:'8 new orders'},
      //   ]
      // },
    ]
  }

    const listInfo = data.listInfo.map((value,k)=>{
      return(
        <div key={`firstInfo-${k}`} className="col-lg-3 col-sm-6 col-xs-12">
        <Info {...value} />
        </div>
      )
    })

    const listInfo2 = data.listInfo2.map((val,k)=>{
      return(
        <div key={`secondInfo-${k}`} className="col-md-4 col-sm-6 col-xs-12">
          <div className={"main-box small-graph-box "+val.className}>
          <span className="value">{val.value}</span>
          <span className="headline">{val.headline}</span>
          <div className="progress">
          <div style={{width:val.progress}} role="progressbar" className="progress-bar">
          <span className="sr-only">{val.progress} Complete</span>
          </div>
          </div>
          { ( val.subinfo && (val.subinfo.length > 0) ) ? val.subinfo.map((val2,kk)=>{
            return(
              <span key={`subinfo-${k}-${kk}`} className="subinfo">
                <i className={val2.iconDesc}></i> {val2.desc}
              </span>
            )
          }) : null }

          </div>
        </div>
      )
    })

    return(
      <div>
        <Header title="Dashboard" />
        {/* <div>
            <button className="btn btn-primary dark-theme-switch float-right" style={{padding: "1px", float: "center"}}
            onClick={this.onThemeSwitch.bind(this)}>Dark Theme </button>
            <div class='theme-switch-inner'></div>
        </div> */}

        {listInfo}

        {listInfo2}
        <div className="col-xs-12">
        <Box>
          <BoxHeader>
            <h2 className="pull-left">Transactions</h2>
            <div className="filter-block pull-right">
              <button  className="btn btn-primary">
              <i className="fa fa-plus"></i> New Transaction</button>
              <div className="form-group pull-left">
                <input type="text" className="form-control" placeholder="Search..."/>
                <i className="fa fa-search search-icon"></i>
              </div>
              <button className="btn btn-primary pull-right" disabled>
              <i className="fa fa-eye fa-lg"></i> View all Transaction </button>
            </div>
          </BoxHeader>

          <BoxBody>
            <MyTable className="table table-hover" {...dataTable}/>
          </BoxBody>
        </Box>
        </div>
      </div>
    )
  }
}
export default connect()(Tes)

//================================ Data Samples =====================================


const dataTable = {
  header:['Hedging ID','Date','Company','Status','Price',''],
  body:[
    [ <button className="link-button a">#5832</button>,
      '2021/04/08',
      <button className="link-button a">Google</button>,
      <span className="label label-warning">On hold</span>,
      <span dangerouslySetInnerHTML={{__html: '&dollar; 923.93'}} />,
      <button className="link-button a">
        <span className="fa-stack">
          <i className="fa fa-square fa-external-link fa-stack-2x"></i>
          <i className="fa fa-external-link fa-stack-1x fa-inverse"></i>
        </span>
      </button>
    ],
    [ <button className="link-button a">#8002</button>,
      '2021/03/18',
      <button className="link-button a">Robert Bosch</button>,
      <span className="label label-success">Completed</span>,
      <span dangerouslySetInnerHTML={{__html: '&dollar; 825.50'}} />,
      <button className="link-button a">
        <span className="fa-stack">
          <i className="fa fa-square fa-external-link fa-stack-2x"></i>
          <i className="fa fa-external-link fa-stack-1x fa-inverse"></i>
        </span>
      </button>
    ],
    [ <button className="link-button a">#2547</button>,
      '2021/02/04',
      <button className="link-button a">TCS</button>,
      <span className="label label-info">Pending</span>,
      <span dangerouslySetInnerHTML={{__html: '&dollar; 1625.50'}} />,
      <button className="link-button a">
        <span className="fa-stack">
          <i className="fa fa-square fa-external-link fa-stack-2x"></i>
          <i className="fa fa-external-link fa-stack-1x fa-inverse"></i>
        </span>
      </button>
    ],
    [ <button className="link-button a">#9274</button>,
      '2021/02/07',
      <button className="link-button a">Infosys</button>,
      <span className="label label-danger">Cancelled</span>,
      <span dangerouslySetInnerHTML={{__html: '&dollar; 3534'}} />,
      <button className="link-button a">
        <span className="fa-stack">
          <i className="fa fa-square fa-external-link fa-stack-2x"></i>
          <i className="fa fa-external-link fa-stack-1x fa-inverse"></i>
        </span>
      </button>
    ],
    [ <button className="link-button a">#8463</button>,
      '2021/03/15',
      <button className="link-button a">MR. Cooper</button>,
      <span className="label label-success">Completed</span>,
      <span dangerouslySetInnerHTML={{__html: '&dollar; 4199.99'}} />,
      <button className="link-button a">
        <span className="fa-stack">
          <i className="fa fa-square fa-external-link fa-stack-2x"></i>
          <i className="fa fa-external-link fa-stack-1x fa-inverse"></i>
        </span>
      </button>
    ],
  ]
}
