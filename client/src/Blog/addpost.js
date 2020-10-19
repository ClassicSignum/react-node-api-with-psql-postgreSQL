import React,{Component} from 'react';
import axios from 'axios'
import history from '../utils/history'
import {TextField} from '@material-ui/core';
import {connect} from 'react-redux'
import '../assests/bootstrap.min.css';

const axiosIns=axios.create({
    baseURL:"http://localhost:5000"
  })

class AddPost extends Component{

    handleSubmit = (event)=>{
        event.preventDefault();
        const user_id = this.props.db_profile[0].uid;
        const username = this.props.db_profile[0].username;
        const data={title: event.target.title.value,
                    body: event.target.body.value,
                    username:username,
                    uid: user_id}
        
        axiosIns.post('/api/post/posttodb',data)
             .then(res=>console.log(res))
             .catch((err)=>console.log(err))
             .then(setTimeout(()=>history.replace('/')),700)

    }


    render(){
        return(
            <div style={{marginLeft:"40%"}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                    id='title'
                    label='Title'
                    margin='normal'
                    placeholder="post title"
                    />
                    <br />
                    <TextField
                    id='body'
                    label='body'
                    multiline
                    rows='4'
                    margin='normal'
                    placeholder="post body"
                    />
                    <br />

                    <button className="btn btn-success" type="submit">Submit</button>

                    <br />
                    
                </form>
                    <br />
                    <button className="btn btn-danger" onClick={()=> history.replace('/posts')} >Cancel</button>
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        db_profile:state.auth_reducer.db_profile
    }
}

export default connect(mapStateToProps)(AddPost);