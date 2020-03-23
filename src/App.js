import React from 'react';
import './App.css';
import logo from './24278.svg';

import Interface from './components/Interface/interface'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      apiurl: '',
      restMethod: 'GET',
      results: '',
      selectGET: false,
      selectPOST: true,
      selectPUT: true,
      selectDELETE: true,
      loading: false,
      // history: this.props.history,
    };
    this.handleHistoryChange = this.handleHistoryChange.bind(this)
  }

  handleHistoryChange(h) {
    console.log('this.props-------',h)
    // this.props.onHistoryChange(h)
  }

  handleError = err => {
    console.error('handleError',err)
    return new Response(JSON.stringify({
      code: 400,
      ok: false,
      message: 'Something went wrong',
      url: this.state.apiurl
    }))
  }

  handleLoading = stat => {
    this.setState({
      results: `RESTy is waiting for response from REST api: ${this.state.apiurl}`,
      loading: stat,
    })
  }

  makeAPICall = async () => {
    console.log('-- apiurl',this.state.apiurl);
      this.handleLoading(true)
      const response = await (fetch(this.state.apiurl, {method: this.state.restMethod})
        .catch(this.handleError));
      // console.log('---- response',response);
      this.handleLoading(false)
      if (!response.ok) {
        this.setState({
          results: `Error: ${response.status.toString()}`,
        })
      } else {
        // console.log('-- in makeAPicall ----',this.state.apiurl);
        this.handleHistoryChange(this.state.apiurl);
        // this.props.onHistoryChange(this.state.apiurl);
        const data = await response.json();
        this.setState({
          results: JSON.stringify(data),
        })
      }
  }

  handleChange = e => {
    this.setState({
      apiurl: e.target.value
    });
  }

  changeColor = (val) => {
    this.setState({restMethod: val})
    if (val === 'GET') {
      this.setState({selectGET: !this.state.selectGET})
      if (!this.state.selectPOST) this.setState({selectPOST: !this.state.selectPOST})
      if (!this.state.selectPUT) this.setState({selectPUT: !this.state.selectPUT})
      if (!this.state.selectDELETE) this.setState({selectDELETE: !this.state.selectDELETE})
    }
    if (val === 'POST') {
      if (!this.state.selectGET) this.setState({selectGET: !this.state.selectGET})
      this.setState({selectPOST: !this.state.selectPOST})
      if (!this.state.selectPUT) this.setState({selectPUT: !this.state.selectPUT})
      if (!this.state.selectDELETE) this.setState({selectDELETE: !this.state.selectDELETE})
    }
    if (val === 'PUT') {
      if (!this.state.selectGET) this.setState({selectGET: !this.state.selectGET})
      if (!this.state.selectPOST) this.setState({selectPOST: !this.state.selectPOST})
      this.setState({selectPUT: !this.state.selectPUT})
      if (!this.state.selectDELETE) this.setState({selectDELETE: !this.state.selectDELETE})
    }
    if (val === 'DELETE') {
      if (!this.state.selectGET) this.setState({selectGET: !this.state.selectGET})
      if (!this.state.selectPOST) this.setState({selectPOST: !this.state.selectPOST})
      if (!this.state.selectPUT) this.setState({selectPUT: !this.state.selectPUT})
      this.setState({selectDELETE: !this.state.selectDELETE})
    }
  }

  render () {
    let get_class = this.state.selectGET ? "RESTunselected" : "RESTselected"
    let post_class = this.state.selectPOST ? "RESTunselected" : "RESTselected"
    let put_class = this.state.selectPUT ? "RESTunselected" : "RESTselected"
    let delete_class = this.state.selectDELETE ? "RESTunselected" : "RESTselected"
    let loadid = this.state.loading ? "loading" : "notloading"
    return (
      <div className="App">
        <form className="URLform">
          <input onChange={this.handleChange} type="text" name="urlpath" placeholder='Place URL here'></input>
        </form>
        <div className="buttons">
          <div className="RESTmethods">
            <button className="method" id={get_class} onClick={() => this.changeColor('GET')}>GET</button>
            <button className="method" id={post_class} onClick={() => this.changeColor('POST')}>POST</button>
            <button className="method" id={put_class} onClick={() => this.changeColor('PUT')}>PUT</button>
            <button className="method" id={delete_class} onClick={() => this.changeColor('DELETE')}>DELETE</button>
            <div>
              <button className="run" onClick={this.makeAPICall}>RUN</button>
            </div>
          </div>
        </div>
        <img src={logo} className="App-logo" id={loadid} alt="logo" />
        <Interface content={this.state.results} />
      </div>
    );
  }
}

export default App;
