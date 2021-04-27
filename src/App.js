import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router, NavLink, useParams, Link } from 'react-router-dom';
import DataAdd from './components/DataAdd'

function Nav(props) {
  return (
    <nav>
      <h1><Link to="/">Programing</Link></h1>
      <ul>
      { props.category ? props.category.map( topic => 
        <li key={topic.id}>
          <NavLink to={"/"+topic.title} activeClassName="selected" className="link" >{topic.title}</NavLink> 
        </li>) : ""}
      </ul>
    </nav>
  );
}
function Profile() {
  return (
    <div className="profile">
      <h1>Profile</h1>
    </div>
  );
}


function Home() {
  return (
    <div className="Topics">
      <div className="contents">
        <h1 className="title">Home</h1>
      </div>
    </div>
  );
}

function Topics(props) {
  let data = props.data;
  return (
    <div className="Topics">
      <Switch>
        <Route exact path={"/"+data.title}>
          <div className="contents">
            <h1 className="title">{data.title}</h1>
            <div className="Container">
              {data.contents ? data.contents.title.map( box => <NavLink to={"/"+data.title+"/"+box} className="box" key={data.contents.title.indexOf(box)}>{box}</NavLink>) : ""}
              <DataAdd category={data.id}/>
            </div>
          </div>
          <Profile></Profile>
        </Route>
        
        <Route path={"/"+data.title+"/:box_title"}>
          <Box></Box>
          <Link to={"/"+data.title}>Go back</Link>
        </Route>
      </Switch>
    </div>
  );
  function Box() {
    var params = useParams();
    var box_title = "Sorry";
    var box_sub = "Not Found"
    for (var i = 0; i < data.contents.title.length; i++) {
      if (data.contents.title[i] === params.box_title) {
        box_title = data.contents.title[i];
        // box_sub = data.contents.sub[i];
        break;
      }
    }
    return (
      <div className="topic">
        <h1 className="title">{box_title}</h1>
        {/* <p className="contents">{box_sub}</p> */}
        
      </div>
    );
  }
}




class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      data: null,
    }  
  }

  fresh = () => {
    this.setState({data: null});
    this.callApi()
      .then(res => this.setState({data: res}))
      .catch(err => console.log(err));
  }
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({data: res}))
      .catch(err => console.log(err));
    // this.callApi_classification()
    //   .then(res => this.setState({classification: res}))
    //   .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('https://hanji-serve.herokuapp.com/api/data');
    const body = await response.json();
    body.map( category => {
      category['contents'] = {'title':category['contents'].split(",")};
    })
    return body; 
  }
  // callApi_classification = async () => {
  //   const response = await fetch('/api/classification');
  //   const body = await response.json();
  //   return body; 
  // }

  render () {
    return (
      <div className="App">
        <Router>
          <Nav category={this.state.data}/>
          <Switch>
            <Route exact path='/'> <Home /> </Route>
            {this.state.data ? this.state.data.map( topic => <Route path={'/'+topic.title} key="topic.id"> <Topics data={topic} /> </Route>) : ""}
            
          </Switch>
        </Router>        
      </div>
    );
  }
}

export default App;
