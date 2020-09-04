import React from 'react'
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, TableHead} from '@material-ui/core'
import { Link } from "react-router-dom"

const Blogs = ({blogs}) => {
    return(
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Blog</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map(blog =>
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
     </TableContainer>  
    )
}

export default Blogs