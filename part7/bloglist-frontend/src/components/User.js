import React from 'react'
import { Link } from "react-router-dom"
import { TableRow, TableCell } from '@material-ui/core'

const User = ({ user }) => {

  return(
    <TableRow key={user.id}>
      <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell> 
      <TableCell>{user.blogs.length}</TableCell>
    </TableRow>
)}

export default User