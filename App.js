import React from 'react';
import './App.css';
import './main.css';
import FormTable from './FormTable'
import DataTable from './DataTable'

class FormView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view : '',
      addedData : []
    }
  }

  onClickTable = () => {
    this.setState({
      view : 'table'
    })    
  }

  onClickForm = () => {
    this.setState({
      view : 'form'
    })
  }

  removeRow = (event, id) => {
    event.preventDefault();
    const { localStorage } = window;
    let localData = JSON.parse(localStorage.getItem('data'))
    let new_local_data = localData.filter(item => item.id !== id)
    localStorage.setItem('data', JSON.stringify(new_local_data))
    this.setState(state => ({
      ...state,
      addedData : new_local_data
    }))
  }
  //test comment to see what is changes

  componentDidMount(){
    const { localStorage } = window;
    const localData = JSON.parse(localStorage.getItem('data')) || []
    this.setState(
      state => ({
        ...state,
        addedData : localData
      })
    )
  }

  render() {
    return (
      <>
        <div className="button_container">
          <button
            onClick={this.onClickTable}
            className={'button_blue button'}
          >
            Table View
          </button>
          <button
            onClick={this.onClickForm}
            className={'button_green button'}
          >
            Form fillup
          </button>
        </div>
        <div>
          {
            this.state.view === 'form'
            ?
            <FormTable
              addatafunction={
                (newData) => this.setState(state => (
                      {
                        ...state,
                        addedData : [...state.addedData, newData]
                      }
                ))
              }
            />
            :
            this.state.view === 'table'
            ?
            <DataTable
              addedData={this.state.addedData} 
              removeRow={this.removeRow}
              
            />
            :
            null
          }
        </div>
      </>
    );
  }
}
export default FormView;

