import React, { Component } from 'react';

    class UserForm extends Component {
      constructor() {
        super();
        this.state = {
          fname: '',
          lname: '',
          email: '',
          dob:   '',
          bio:   ''
        };
      }

      onChange = (e) => {
        e.persist()
        this.setState(state => (
          {
            ...state,
            [e.target.name]: e.target.value
          }
        ));
      }
      
      onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { localStorage } = window;
        let localData = JSON.parse(localStorage.getItem('data')) || []
        const theDataTobeAdded = {
          fname : this.state.fname,
          lname : this.state.lname,
          email : this.state.lname,
          dob : this.state.dob,
          bio : this.state.bio,
          id : localData.length
        }
        this.props.addatafunction(theDataTobeAdded)
        let new_local_data = JSON.stringify([...localData, theDataTobeAdded])
        localStorage.setItem('data', new_local_data)
        this.setState({
          fname : '',
          lname : '',
          email : '',
          dob : '',
          bio : ''
        })
      }

      
      render() {
        const { fname, lname, email, dob, bio } = this.state;
        return (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="fname"
              value={fname}
              required
              onChange={this.onChange}
              placeholder='First Name'
            />
            <input
              type="text"
              name="lname"
              required
              value={lname}
              onChange={this.onChange}
              placeholder='Last Name'
            />
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={this.onChange}
              placeholder='Email'
            />
             <input
              type="date"
              name="dob"
              required
              value={dob}
              onChange={this.onChange}
            />
             <input
              type="textarea"
              name="bio"
              required
              value={bio}
              onChange={this.onChange}
              placeholder='Bio'
            />
            <button type="submit">Submit</button>
          </form>
        );
      }
    }
    export default UserForm;