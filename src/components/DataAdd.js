import React from 'react';
import { post } from 'axios';

class DataAdd extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // file: null,
        // fileName: '',
        title: '',
        description: ''
      }
    }
    addData = () => {
      const url = 'https://hanji-serve.herokuapp.com/api/add';
      const json = {};
      // formData.append('img', this.state.file);
      json['title'] = this.state.title;
      json['description'] = this.state.description;
      json['category'] = this.props.topic.id;
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
  
    handleFormSubmit = async (event) => {
      event.preventDefault();
      await this.addData()
        .then((res) =>{
          console.log(res.data);
        })  
      window.location.href = '/'+this.props.topic.title+'/'+this.state.title;
    }
    
    render() {
      return (
        <form onSubmit={this.handleFormSubmit} className="contents">
            {/* img: <input type='file' name='file' file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /> */}
            <input type='text' name='title' value={this.state.title} placeholder="Title" onChange={this.handleValueChange} className="title"/><br />
            <textarea name='description' value={this.state.description} placeholder="Description" onChange={this.handleValueChange} className="Container"/><br />
            {/* createtime: <input type='text' name='createtime' value={this.state.createtime} onChange={this.handleValueChange} /> */}
            <button type='submit'>ADD</button>
        </form>
      )
    }
}


export default DataAdd;