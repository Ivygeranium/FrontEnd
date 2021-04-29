import React from 'react';
import { post } from 'axios';


class DataUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          title: this.props.title,
          preTitle: this.props.title,
          description: this.props.description
        }
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    updateData = () => {
        const url = 'https://hanji-serve.herokuapp.com/api/contents/' +this.state.preTitle;

        const json = {};
        json['title'] = this.state.title;
        json['description'] = this.state.description;
        console.log(json);
        return post(url, json);
    }

    handleFormSubmit = async (event) => {
        event.preventDefault();
        await this.updateData()
          .then((res) =>{
            console.log(res.data);
          })  
        window.location.href = '/'+this.props.loc+'/'+this.state.title;
      }
    render() {
        return (
            <form onSubmit={this.handleFormSubmit} className='contents'>
                <input type='text' name='title' value={this.state.title} placeholder="Title" onChange={this.handleValueChange} className="title"/><br />
                <textarea name='description' value={this.state.description} placeholder="Description" onChange={this.handleValueChange} className="Container"/><br />
                <button type='submit'>UPDATE</button>
            </form>
        )
    }
}


export default DataUpdate;