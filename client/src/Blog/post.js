import React,{Component} from 'react';
import {Button} from '@material-ui/core';
// import {Table} from 'react-bootstrap';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import * as ACTIONS from '../store/actions/actions';
import Sorting from './sorting';

// import axios from 'axios'
// const axiosIns=axios.create({
//     baseURL:"http://localhost:5000"
// })
// const RenderPosts = post =>(
//     <TableRow>
//         <TableCell>
//             <Link to={{pathname:"/post/"+post.post.pid,state:{post}}}>
// <h4>{post.post.title}</h4>

//             </Link>
//             <br />
// <p>{post.post.body}</p>
//         </TableCell>
//     </TableRow>
// )

class Posts extends Component{

    componentDidMount=()=>{
        
        // axiosIns.get('/api/get/allposts')
        //      .then((res)=>{this.props.set_posts(res.data)})
        //      .catch((err)=>console.log(err))
        // axiosIns.get('/hello')
        //       .then(res=>console.log(res.data))
        //       .catch(err=>console.log(err))
    }

  

    render(){
     
        return(
            <div className="text-center" >
                <br />
                {this.props.is_authenticated ? 
                
                <Link to="/addpost">
                    <Button variant="contained" color="primary">Add Post</Button>
                </Link>
                  :  <Link to="/">
                  <Button variant="contained" color="primary">Sign in to Add Post</Button>
              </Link> 
               }
                <h1>Posts</h1>
                {this.props.posts? <Sorting  /> : null}
                {/* <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                Title
                            </TableRow>
                            <TableRow>
                                Body
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.posts ? this.props.posts.map(post=>
                            <RenderPosts key={post.pid} post={post} />
                            ):null}
                        </TableBody>
                    </Table>
                </Paper> */}
                {/* <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>post id</th>
                            <th>post title</th>
                            <th>post body</th>
                            <th>user id</th>
                            <th>user name/author</th>
                            <th>post created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.posts ? this.props.posts.map(post =>
                            <tr key={post.pid} post={post}>
                                <td>{post.pid}</td>
                                <td>
                                    <Link to={{pathname:"/post/"+post.pid,state:{post}}}>
                                    {post.title}
                                    
                                    </Link>
                                </td>
                                <td>{post.body}</td>
                                <td>{post.user_id}</td>
                                <td>{post.author}</td>
                                <td>{post.date_created.substr(0,10)}</td>
                                
                            </tr>

                        ) : null}

                       
                    </tbody>
                </Table> */}
                    
                
                {/* pagination */}



            </div>
        );
    }
}


const mapStateToProps=state=>{
    return{
        posts:state.posts_reducer.posts,
        is_authenticated:state.auth_reducer.is_authenticated
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        set_posts:(posts)=>dispatch(ACTIONS.fetch_db_posts(posts))
      
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Posts);