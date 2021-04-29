import React from 'react';

class DataDelete extends React.Component {

  async deleteData(title){
    const url = 'https://hanji-serve.herokuapp.com/api/contents/' + title;
    await fetch (url, {
      method: 'DELETE'
    });
    window.location.href = '/'+this.props.loc;
  }
    render() {
      return (
        <button onClick={(e) => {this.deleteData(this.props.title)}}>Delete</button>
      )
    }
}


export default DataDelete;