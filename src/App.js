// import logo from './logo.svg';
import './App.css';


import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
// import NewsItems from './components/NewsItems';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
export default class App extends Component {
  
  c='jph'
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        
        <Routes>
          <Route path='/' element={
          <News pageSize={5} country='in' category='general'/>}/>
          
          <Route path='/business'element={
          <News key='business' pageSize={5} country='in' category='business' />}/>
          <Route path='/science'element={
          <News key='science' pageSize={5} country='in' category='science'/>}/>
          <Route path='/entertainment'element={
          <News key='entertainment' pageSize={5} country='in' category='entertainment'/>}/>
          <Route path='/sports' element={
          <News key='sports' pageSize={5} country='in' category='sports'/>}/>
          <Route path='/health' element={
          <News key='health' pageSize={5} country='in' category='health'/>}/>
          <Route path='/technology' element={
          <News key='technology' pageSize={5} country='in' category='technology'/>}
          />
          
        </Routes>
        </Router>
        
      </div>
    )
  }
}
