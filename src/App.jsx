import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then(res=> res.json())
    .then(data=> setUsers(data))
  }, []);

  const handleAddUser = (e)=>{
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email};
    console.log(user);
    fetch('http://localhost:5000/users',{
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      form.reset();
      const newUser = [...users, data];
      setUsers(newUser);
    })

  }
  return ( 
    <>
      <h1>Users Management System</h1>
      <h3>Numbers of Users: {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="name" id="" />
        <br />
        <input type="email" name="email" placeholder="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {
          users.map(user=> <p key={user.id}>Id: {user.id}, Name: {user.name}, Email: {user.email}</p>)
        }
      </div>
    </>
  );
}

export default App;
