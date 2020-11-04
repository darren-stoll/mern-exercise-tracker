import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = () => {
  const [username, setUsername] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [duration, setDuration] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const [users, setUsers] = React.useState([]);
  
  const {id}= useParams();
  console.log(id);
  

  React.useEffect(() => {
    axios.get(`http://localhost:5000/exercises/${id}`)
      .then (res => {
        setUsername(res.data.username);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setDate(new Date(res.data.date));
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          setUsers(res.data.map(user => user.username));
          
        }
      })
  }, [])

  const submitNewExercise = (e) => {
    
    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date
    }

    console.log(exercise);

    axios.post(`http://localhost:5000/exercises/update/${id}`, exercise)
      .then(res => console.log(res.data));

    e.preventDefault();
  }

  const userInput = React.useRef('userInput');

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit = {submitNewExercise}>
        <div className="form-group">
          <label>Username: </label>
          <select ref={userInput}
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}>
            {
              users.map((user) => {
                return <option key={user} value={user}>{user}</option>
              })
            }
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text"
            required
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
            />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input type="text"
            className="form-control"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <DatePicker
            selected={date}
            onChange={e => setDate(e)}
            />
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default EditExercise;