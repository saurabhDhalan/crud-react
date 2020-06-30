import React, { Component, Fragment } from 'react';

class DataTable extends Component {
    constructor() {
      super();
      this.state = {
        searchQuery : '',
        sortingFilter : ''
      };
    }

    handleChange = event => {
        event.persist()
        this.setState(state => ({
            ...state,
            searchQuery : event.target.value
        }))
    }

    onSortButtonClicked = event => {
        this.setState(state => ({
            ...state,
            sortingFilter : state.sortingFilter === 'a-z' ? 'z-a' : 'a-z'
        }))
    }

    onSortDateButtonClicked = event => {
        this.setState(state => ({
            ...state,
            sortingFilter : state.sortingFilter === 'a-z-date' ? 'z-a-date' : 'a-z-date'
        }))
    }

    render() {

        const that = this

      const searchedDataArr = function(){
          let dataToBeReturned = that.props.addedData
          if(that.state.searchQuery !== ''){
              dataToBeReturned = that.props.addedData.filter(
                  item => {
                      return item.fname.toLowerCase().includes(that.state.searchQuery.toLowerCase())
                    }
              )
              
              return dataToBeReturned
          }
          if(that.state.sortingFilter !== ''){
            if(that.state.sortingFilter === 'a-z'){
                dataToBeReturned = dataToBeReturned.sort(
                    (a,b) => {
                        if( a.lname.toLowerCase() >  b.lname.toLowerCase() ){
                            return 1
                        }
                        if( a.lname.toLowerCase() <  b.lname.toLowerCase() ){
                            return -1
                        }
                        return 0
                    }
                )
            }
            else if(that.state.sortingFilter === 'z-a'){
                dataToBeReturned = dataToBeReturned.sort(
                    (a,b) => {
                        if( a.lname.toLowerCase() <  b.lname.toLowerCase() ){
                            return 1
                        }
                        if( a.lname.toLowerCase() >  b.lname.toLowerCase() ){
                            return -1
                        }
                        return 0
                    }
                )
            }
            else if(that.state.sortingFilter === 'a-z-date'){
                dataToBeReturned = dataToBeReturned.sort(
                    (a,b) => {
                        return new Date(b.dob) - new Date(a.dob);
                    }
                )
            }
            else if(that.state.sortingFilter === 'z-a-date'){
                dataToBeReturned = dataToBeReturned.sort(
                    (a,b) => {
                        return new Date(a.dob) - new Date(b.dob);
                    }
                )
            }
          }
          if(that.state.searchQuery !== '' && that.state.sortingFilter !== ''){
            dataToBeReturned = that.props.addedData
            return dataToBeReturned
          }
          return dataToBeReturned
      }

    
      return (
        <Fragment>
            <input
              type={'search'}
              value={this.state.searchQuery}
              onChange={this.handleChange}
              placeholder='search by First Name...'
              className='searchInput'
            />
            <button
              onClick={this.onSortButtonClicked}
              className={'button_sorting'}
            >
                {
                    this.state.sortingFilter === 'a-z'
                    ?
                    'Sort By Descending Last Name'
                    :
                    'Sort By Aescending Last Name'
                }
            </button>
            <button
              onClick={this.onSortDateButtonClicked}
              className={'button_sorting'}
            >
                {
                    this.state.sortingFilter === 'a-z-date'
                    ?
                    'Sort By Oldes-Latest DOB'
                    :
                    'Sort By Latest-Oldest DOB'
                }
            </button>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th>Short Bio</th>
                </tr>
            </thead>
            <tbody>
            {
                searchedDataArr().map((item, index) => {
                    return (
                        <tr key={index.toString()}>
                            <td>{item.fname}</td>
                            <td>{item.lname}</td>
                            <td>{item.email}</td>
                            <td>{new Date(item.dob).toLocaleDateString()}</td>
                            <td>{item.bio}</td>
                            <td><button onClick={(event) => this.props.removeRow(event, item.id)}>Delete</button></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>   
        </Fragment>
      );
    }
}
export default DataTable;