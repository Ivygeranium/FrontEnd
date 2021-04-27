import React from 'react';
import { post } from 'axios';

class DataAdd extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // file: null,
        // fileName: '',
        title: '',
        // sub: '',
        // createtime: ''
      }
    }
    addData = () => {
      const url = 'https://hanji-serve.herokuapp.com/api/box';
      const json = {};
      // formData.append('img', this.state.file);
      json['title'] = this.state.title;
      json['id'] = this.props.category;
      // json['sub'] = this.state.sub;
      // formData.append('createtime', this.state.createtime);
      // const config = {
      //   headers:{
      //     'content-type': 'multipart/form-data'
      //   }
      // }
      return post(url, json);
    }
    // handleFileChange = (e) => {
    //   this.setState({
    //       file: e.target.files[0],
    //       fileName: e.target.value
    //   })
    // }
  
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
  
    handleFormSubmit = (event) => {
      event.preventDefault();
      this.addData()
        .then((res) =>{
          console.log(res.data);
          // this.props.fresh();
        })
      this.setState({title: ''})
      
    }
  
    render() {
      return (
        <form onSubmit={this.handleFormSubmit}>
            <h1>ADD BOX</h1>
            {/* img: <input type='file' name='file' file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /> */}
            title: <input type='text' name='title' value={this.state.title} onChange={this.handleValueChange} /><br />
            {/* sub: <input type='text' name='sub' value={this.state.value} onChange={this.handleValueChange} /> */}
            {/* createtime: <input type='text' name='createtime' value={this.state.createtime} onChange={this.handleValueChange} /> */}
            <button type='submit'>ADD</button>
        </form>
      )
    }
}


export default DataAdd;