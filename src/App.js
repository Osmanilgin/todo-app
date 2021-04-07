import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import Todo from './Todo';
import db from './Firebase'
import firebase from 'firebase'

function App() {
 const [todos, setTodos]=useState([]);
 const [input, setInput]=useState('')

//when the app loads, we need to listen to the database and fetch new todos as the yget added/removed
 useEffect (() => {
   // this code here... fires when the  app.js loads
    db.collection('tasks').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id:doc.id, todo: doc.data().todo})))
        })
 },[]) 

   const addTodo = (event) =>{
  // this will fire off when we click button

    event.preventDefault(); // -> will stop the REFRESH
 
         db.collection('tasks').add({
           todo: input,
           timestamp: firebase.firestore.FieldValue.serverTimestamp()
         })
         
         setInput('');  // clear up the input
  }

  return (
    <div className="App"> 
    <h1 >✔️ Todo List ✔️ <hr/></h1>
    

      <form >
        <FormControl>
          <InputLabel style={{
            fontSize:"20px",
            fontWeight:"500",
            marginTop:"-10px",
          }} > ✏️ Write a Todo</InputLabel>

    <Input  value={input} onChange={event => setInput(event.target.value)}/>
    <Button style={{cursor:'pointer'}} disabled={!input} type = "submit" onClick={addTodo} variant="contained" color="primary"> Add Todo </Button>
       
    </FormControl>  
    </form>
       
     <ul>
        {todos.map(todo => (
          <Todo todo={todo}/>
          //<li>{todo}</li>
        ))}
     </ul>
    </div>
  );
}

export default App;
