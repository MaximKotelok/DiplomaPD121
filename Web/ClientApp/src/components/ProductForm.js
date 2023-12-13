import React, { Component } from 'react';
import { postToServer } from '../utils/Queries';

class ProductForm extends Component {

    

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      categoryId: '',
      specialRow: '',
    };
  }

 
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
 
  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, categoryId, specialRow } = this.state;
    const data = postToServer("Medicine", 
    {
        Title: title, 
        Description: description, 
        CategoryId: categoryId, 
        SpecialRow: specialRow
    });

    console.log(data);

    this.setState({
      title: '',
      description: '',
      categoryId: '',
      specialRow: '',
    });
    
  };

  render() {
    const { title, description, categoryId, specialRow } = this.state;

    return (
      <form>
        <div>
          <label>
            Title:
            <input name="title" type="text" value={title} onChange={this.handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea name="description" value={description} onChange={this.handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            CategoryId:
            <input name="categoryId" type="text" value={categoryId} onChange={this.handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            SpecialRow:
            <input name="specialRow" type="text" value={specialRow} onChange={this.handleInputChange} />
          </label>
        </div>
        <button onClick={this.handleSubmit}>Send</button>
      </form>
    );
  }
}

export default ProductForm;
