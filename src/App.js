import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router, NavLink, useParams, Link } from 'react-router-dom';
import DataAdd from './components/DataAdd';
import FadeIn from 'react-fade-in';
const serverURL = 'https://hanji-serve.herokuapp.com';

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

function Home(props) {
  return (
    <div className="Topics">
      <div className="contents">
        <h1 className="title">Home</h1>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="profile">
      <h1>Task management</h1>
    </div>
  );
}


function Topics(props) {
  let data = props.data;
  let title = props.topic.title;
  return (
    <div className="Topics">
      <Switch>
        <Route exact path={"/"+title}>
          <FadeIn className="contents">
            <h1 className="title">{title}</h1>
              <div className="Container">
                  {data ? data.map( datum => <NavLink to={"/"+title+"/"+datum.title} className="box" key={datum.id}>{datum.title}</NavLink>) : ""}
                  <NavLink to={"/"+title+"/add"} className="box">ADD BOX</NavLink>
              </div>
          </FadeIn>
          <Profile />
        </Route>

        <Route path={"/"+title+"/add"}>
          <DataAdd topic={props.topic}/>
          <Profile />
        </Route>
        
        <Route path={"/"+title+"/:box_title"}>
          <Box></Box>
          <Profile />
        </Route>
      </Switch>
    </div>
  );

  function Box() {
    var params = useParams();
    var box_title = "Sorry";
    var box_description = "Not Found"
    for (var i = 0; i < data.length; i++) {
      if (data[i].title === params.box_title) {
        box_title = data[i].title;
        box_description = data[i].description;
        break;
      }
    }
    return (
      <FadeIn>
        <div className="topic">
          <h1 className="title">{box_title}</h1>
          <p className="contents">{box_description}</p>
        </div>
      </FadeIn>
    );
  }
}




class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      category: null,
      contents: null
    }  
  }
  dataFilter(id) {
    var arr = [];
    this.state.contents.map( content => {
      if(content.contents_id === id){
        arr.push(content);
      }
    })
    return arr
  }
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({category: res[0], contents: res[1]}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response_nav = await fetch(serverURL+'/api/nav');
    const response_contents = await fetch(serverURL+'/api/contents');
    const body_nav = await response_nav.json();
    const body_contents = await response_contents.json();

    return [body_nav, body_contents]; 
  }

  render () {
    return (
      <div className="App">
        <Router>
          <Nav category={this.state.category}/>

          <Switch>
            <Route exact path='/FrontEnd'> <Home /> </Route>

            {this.state.category ? this.state.category.map( topic => 
            <Route path={'/'+topic.title} key={topic.id}> <Topics data={this.dataFilter(topic.id)} topic={topic}/> </Route>) : <Route path='/'><div className="loading"/></Route>}

            <Route path='/'> <h1>NOT FOUNDED</h1> </Route>
          </Switch>
        </Router>        
      </div>
    );
  }
}

export default App;
