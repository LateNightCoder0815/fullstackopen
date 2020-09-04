import React from 'react'
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, TableHead} from '@material-ui/core'
import User from '../components/User'

const Users = ({users}) => {
    return(
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {users.map(user =>
                <User key={user.id} user={user} />)}
          </TableBody>
        </Table>
     </TableContainer>  
    )
}


export default Users