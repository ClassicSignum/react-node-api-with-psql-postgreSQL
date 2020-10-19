import React,{Component} from 'react';
import axios from 'axios'
import history from '../utils/history'
import {TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Button} from '@material-ui/core';
import {connect} from 'react-redux'
import * as ACTIONS from '../store/actions/actions';
import moment from 'moment';


// const RenderComments = (comment)=>(
//     <div>
//         <h3> {comment.comment.comment} </h3>
//         <small> {comment.comment.date_created} </small>
//         <p> By : {comment.comment.author} </p>
//         {comment.cur_user_id === comment.comment.user_id ? 
//            <Button onClick={()=>this.handleClickOpen(comment.comment.cid,comment.comment.comment)} >Edit</Button> 
//         :null    
//         }
//     </div>
// )

const axiosIns=axios.create({
    baseURL:"http://localhost:5000"
})



class ShowPost extends Component{

    constructor(props){
        super(props)
        this.state={
            open:false,
            comment:'',
            cid:''
        }
    }

    componentDidMount=()=>{

        if(this.props.is_authenticated===false){
            alert("please sign in to see comments..")
            history.replace("/");
        }

        const data={
            id:this.props.location.state.post.pid
        }
        axiosIns.get('/api/get/allpostcomments/'+data.id)
             .then(res=>this.props.set_comments(res.data))
             .catch((err)=>console.log(err))
    }

    handleClickOpen=(cid,comment)=>(

        this.setState({open:true,comment:comment,cid:cid})

    )
    handleClose=()=>(

        this.setState({open:false,comment:'',cid:''})

    )

    handleCommentChange=(event)=>{
        // event.preventDefault()
        this.setState({comment:event.target.value})
    }

    handleSubmit=(event)=>{
        event.preventDefault()
        const user_id = this.props.db_profile[0].uid
        const post_id = this.props.location.state.post.pid
        const username = this.props.db_profile[0].username
        const data = {comment: event.target.comment.value,post_id:post_id,user_id:user_id,username:username}
        axiosIns.post('/api/posts/commenttodb',data)
             .then(res=>console.log(res))
             .catch((err)=>console.log(err))
             .then(setTimeout(()=>history.replace('/posts'),700))
    }

    handleUpdate=()=>{
        // console.log(this.props.db_profile)
        const comment = this.state.comment
        const cid = this.state.cid
        const user_id = this.props.db_profile[0].uid
        const post_id = this.props.location.state.post.post.pid
        const username = this.props.db_profile[0].username

        const data = {cid:cid,comment: comment,post_id:post_id,user_id:user_id,username:username}
        console.log(data);
        axiosIns.put('/api/put/commenttodb',data)
              .then(res=>console.log(res))
              .catch((err)=>console.log(err))
              .then(setTimeout(()=>history.replace('/posts'),700))
        

    }

    handleDeleteComment=()=>{
        const cid = this.state.cid

        axiosIns.delete('/api/delete/comment',{data:{cid:cid}})
              .then(res=>console.log(res))
              .catch((err)=>console.log(err))
              .then(setTimeout(()=>history.replace('/posts'),700))
    }

    render(){

        
        return(
            <div>

                <div className="text-center bg-secondary text-white-50"  >
                    <h2>Post</h2>
                     <h4>Post title: {this.props.location.state.post.title}</h4>
                     <p>Post body: {this.props.location.state.post.body}</p>
                     <p>Post author: {this.props.location.state.post.author}</p>
                </div> 
                
                <div style={{marginLeft:"10%"}}>

                <h2 className="text-black text-center"> Comments :</h2>
                
                { this.props.db_profile!=null ? this.props.comments ? this.props.comments.map(comment=>
                    <div comment={comment} cur_user_id={this.props.db_profile[0].uid} key={comment.cid}>
                    <h4> Comment: {comment.comment} </h4>
                    <small> Comment created: {moment(comment.date_created).format('MMMM do, YYYY | h:mm a')} </small>
                    <p> By : {comment.author} </p>
                    {this.props.db_profile[0].uid === comment.user_id ? 
                       <Button variant="contained" color="primary" onClick={()=>this.handleClickOpen(comment.cid,comment.comment)} >Edit</Button> 
                    :null    
                    }
                </div>
                    // <RenderComments comment={comment} cur_user_id={this.props.db_profile[0].uid} key={comment.cid} />
                    ) :null : <Button variant="contained" color="primary" >Sign in to see comments</Button>}
                </div>

                <div className="text-center">
                    <form onSubmit={this.handleSubmit}>

                        <TextField  id="comment" label="Comment" margin="normal"/>
                        <br />

                        <Button type="submit" color="primary" variant="contained" >Submit Comment</Button>

                    </form>
                    
                </div>

                <div>

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert dialog description"
                    >
                        <DialogTitle id="alert-dialog-title" >
                            Edit Comment
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <input type="text" value={this.state.comment} onChange={this.handleCommentChange} />
                            </DialogContentText>
                            <DialogActions>
                                <Button onClick={()=>{this.handleUpdate(); this.setState({open:false})} } >
                                    Agree
                                </Button>
                                <Button onClick={()=>this.handleClose()} >
                                    Cancel
                                </Button>
                                <Button onClick={()=>this.handleDeleteComment()} >
                                    Delete
                                </Button>
                            </DialogActions>
                        </DialogContent>

                    </Dialog>

                </div>



            </div>
        );
    }
}

const mapStateToProps=state=>{
return{
    comments: state.posts_reducer.comments,
    db_profile: state.auth_reducer.db_profile,
    is_authenticated:state.auth_reducer.is_authenticated

 }
}

const mapDispatchToProps=dispatch=>{
    return{
        set_comments:(comments)=>dispatch(ACTIONS.fetch_post_comments(comments))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ShowPost);