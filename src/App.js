import React, { Component } from 'react';
import { connect } from 'react-redux'
import localStore from 'src/utils/local-storage'
import {changeAT} from 'src/store/action.login'

import logo from './logo.svg';
import './App.css';
import './dark-theme.css';
import 'src/utils/load-css'
//import LoginPage from 'src/page/login'
import CoreRoute from 'src/utils/route'
import { LOADING } from 'src/store/type'

class App extends Component {

  componentWillMount(){
    this.props.loadAccessToken();
  }
  componentDidMount(){
    setTimeout(()=>{
      this.props.isLoaded(true)
    },3000)

    // Set theme (dark or light) on load
    const theme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('theme', theme);
    
  }
  
  onThemeSwitch(){
      const currentTheme = document.body.getAttribute('theme');
      const newTheme = (currentTheme === 'light') ? 'dark' : 'light';

      document.body.setAttribute('theme', newTheme);
      localStorage.setItem('theme', newTheme);
  }

  componentDidUpdate(prevProps){
    let { login } = this.props
    if( !login.accesstoken )
    {
      this.props.removeAccessToken()
    }else if( login.accesstoken !== prevProps.login.accesstoken ){
      this.props.setAccessToken(login.accesstoken)
    }
  }

  render() {
    let { login } = this.props
    //===================== LOADING ================================
    if(!login.loaded){
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div>
      );
    }
    //===================== LOGIN PAGE ===============================
    if(!login.accesstoken){
      /* return(
        <LoginPage />
      ) */
    }

    //===================== MAIN ROUTE ===============================
    return <CoreRoute />
  }
}

export default connect( store =>{
  return {
    login:store.loginInfo
  }
} , dispatch => {
  return {
    loadAccessToken : async () => {
      let accesstoken = await localStore.get('access_token')
      dispatch(changeAT(accesstoken));
    },
    removeAccessToken:async () => {
      await localStore.remove('access_token')
    },
    setAccessToken:async (value='') => {
      await localStore.set('access_token',value)
    },
    isLoaded: (value=false)=>{
      dispatch({
        type:LOADING,value
      })
    }
  }
})(App);
