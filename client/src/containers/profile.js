import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ACTIONS from '../store/actions/actions';
import history from '../utils/history';
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap';
import {Card,CardContent,CardHeader,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Button} from '@material-ui/core';
import axios from 'axios';
import '../App.css';
import moment from 'moment';


const axiosIns=axios.create({
  baseURL:"http://localhost:5000"
})

class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      post_id: null
    }
  }

  componentDidMount=()=>{

    if(this.props.is_authenticated===false){
      alert("please sign in to see profile..")
      history.replace("/");
  }
  else{

    
    const user_id = this.props.db_profile[0].uid
    axiosIns.get('/api/get/userposts/'+user_id)
    .then((res)=>this.props.set_user_posts(res.data))
    .catch(err=>console.log(err))
  }
}

//search posts 

handleSearchPosts=(event)=>{
  const search_query=event.target.value;

  const user_id = this.props.db_profile[0].uid
  axiosIns.get('/api/get/userposts/'+user_id+'/'+search_query)
  .then((res)=>this.props.set_user_posts(res.data))
  .catch(err=>console.log(err))


}

//ends

  handleClickOpen=(pid)=>{
    this.setState({open:true,post_id:pid})
  }

  handleClickClose=()=>{
    this.setState({open:false,post_id:null})
  }


  RenderProfile = (props) => (
    <div>
      {/* <h1>{props.profile.profile.nickname}</h1>
      <br />
      <img src={props.profile.profile.picture} alt="" />
      <br />
      <h4> {props.profile[0].email}</h4>
      <br />
      <h5> {props.profile[0].username} </h5>
      <br />
      <h6> Email Verified: </h6>
      {props.profile[0].email_verified ? <p>Yes</p> : <p>No</p> } */}
      <Table border="1">
        <thead>

        <tr>
          <th>user id</th>
          <th>user name</th>
          <th>user email address</th>
          <th>email verified</th>
          <th>account created</th>
        </tr>
        </thead>
        <tbody>
          <td>{props.profile[0].uid}</td>
          <td>{props.profile[0].username}</td>
          <td>{props.profile[0].email}</td>
    <td>{props.profile[0].email_verified ? <p>Yes</p> : <p>No</p>}</td>
          <td>
            {/* {props.profile[0].date_created.substr(0,10)} */}
            {moment(props.profile[0].date_created).format('MMMM Do, YYYY | h:mm a')}
            </td>
        </tbody>

      </Table>
      <br />
    </div>
  )

  RenderPosts = post => (

    <div>

    

      <Card styly={{  width: '500px' ,height: '200px', marginBottom: '10px', paddingBottom: '80px'}} >

        <CardHeader
          title={<Link to={{ pathname: '/post/' + post.post.pid, state: { post } }} >
            {post.post.title}
          </Link>}
          subheader={
            <div className="FlexColumn">
              <div className="FlexRow">

                {moment(post.post.date_created).format("MMMM Do, YYYY | h:mm a")}

              </div>
              <div className="FlexRow">
                <Link to={{ pathname: '/editpost/' + post.post.pid, state: { post } }}>
                  <Button color="primary" variant="contained">
                    Edit
                  </Button>
                </Link>
                <Button style={{ marginLeft: "20px" }} variant="contained" color="secondary"
                  onClick={() => this.handleClickOpen(post.post.pid)}>
                  Delete
                </Button>
              </div>
            </div>
          }
        >
          <br />
          <CardContent>
            <span style={{ overflow: 'hidden' }}>{post.post.body}</span>
          </CardContent>




        </CardHeader>

      </Card>
      <hr></hr>

    </div>
  );

  deletePost=()=>{
    const post_id= this.state.post_id;
    axiosIns.delete('/api/delete/postcomments',{data:{post_id:post_id}})
         .then(()=>axiosIns.delete('/api/delete/post',{data:{post_id:post_id}})
            .then(res=>console.log(res)))
            .catch(err=>console.log(err))
            .then(()=>this.handleClickClose())
            .then(()=>setTimeout(()=>history.replace('/'),700))
  }


  render() {
    return(
      <div>
        {this.props.is_authenticated ?
        <div>
          <this.RenderProfile profile={this.props.profile} />
        </div>
      :  history.replace("/") }

        <div style={{width:"400px",marginLeft:"auto",marginRight:"auto",border:"2px double #000",boxShadow:"5px 5px 15px 10px #000"}}>
          My Posts
          <input placeholder="search your post here" className="form-control" type="text" id="search" onChange={this.handleSearchPosts} />
          {this.props.user_posts ? 
          this.props.user_posts.map(post=> <this.RenderPosts post={post} key={post.pid} /> )  
          :null
        }
        </div>

        <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert dialog description"
                    >
                        <DialogTitle id="alert-dialog-title" >
                            Confirm Delete ?
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                               Deleteing Post
                            </DialogContentText>
                            <DialogActions>
                                <Button onClick={()=>this.deletePost()} >
                                    Agree
                                </Button>
                                <Button onClick={()=>this.handleClickClose()} >
                                    Cancel
                                </Button>
                            
                            </DialogActions>
                        </DialogContent>

                    </Dialog>


      </div>

    )}
}


function mapStateToProps(state) {
  return {
    profile: state.auth_reducer.profile,
    user_posts: state.posts_reducer.user_posts,
    db_profile: state.auth_reducer.db_profile,
    is_authenticated:state.auth_reducer.is_authenticated,
     search_posts:state.posts_reducer.search_posts


  }
}

const mapDispatchToProps=dispatch=>{
  return{
      set_user_posts:(posts)=>dispatch(ACTIONS.fetch_USER_posts(posts)),
      posts_success:(posts)=>dispatch(ACTIONS.fetch_search_posts(posts)),
      posts_failure:()=>dispatch(ACTIONS.remove_search_posts())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
