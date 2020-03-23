import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import About from '../About'
import Contact from '../Contact'
import Header from '../Header/header'
import Navbar from '../Navbar/navbar'
import History from '../History'
import App from '../../App'

class Router extends React.Component {
  constructor(props) {
    super(props)
    this.handleAppHistory = this.handleAppHistory.bind(this);
    this.state = { history: ['https://pokeapi.co/api/v2/pokemon/'] };
  }

  handleAppHistory(h) {
    this.setState({ history: this.state.history.push(h) });
  }

  render () {
    const history = this.state.history
    return (
      <BrowserRouter>
        <Header />
        <Navbar />
        <Switch>
          <Route path="/history">
            <History content={history}/>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <App
              content={history}
              onHistoryChange={this.handleAppHistory}
            />
          </Route>
        </Switch>
        <footer>
          Codefellows JS 401d34 Lab 29 Kevin Dreyer
        </footer>
      </BrowserRouter>
    )
  }
}


export default Router
