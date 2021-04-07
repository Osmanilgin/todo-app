import { Button, List, ListItem, ListItemText } from '@material-ui/core'
import "./Todo.css"
import React from 'react'
import db from'./Firebase'
import DeleteIcon from '@material-ui/icons/Delete';

function Todo(props) {
    return (
        <List >  
          <ListItem > 
          
           <ListItemText primary={props.todo.todo} ></ListItemText>
           
            <DeleteIcon style={{cursor:'pointer'}} onClick={event=> db.collection('tasks').doc(props.todo.id).delete()}></DeleteIcon>
             
          </ListItem>
       
        </List>
    )
}

export default Todo
