import React from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = React.useState('');

  const submitNewUser = (e) => {
    
    const user = {
      username: username
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    setUsername('');

    e.preventDefault();
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={submitNewUser}>
        <div className="form-group">
          <label>Username: </label>
          <input type="text"
            required 
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
            />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default CreateUser;