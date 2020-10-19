import React,{Component} from 'react';
import axios from 'axios'
import history from '../utils/history'
import {TextField,Button} from '@material-ui/core';
import {connect} from 'react-redux'


const axiosIns=axios.create({
    baseURL:"http://localhost:5000"
  })

class EditPost extends Component{

    constructor(props){
        super(props);
        this.state={
            title:'',
            body:''
        }
    }

    componentDidMount=()=>{
        this.setState({
            title:this.props.location.state.post.post.title,
            body:this.props.location.state.post.post.body
        })
    }

    handleTitleChange=(event)=>{
        this.setState({title: event.target.value})
    }
    handleBodyChange=(event)=>{
        this.setState({body: event.target.value})
    }

    handleSubmit=(event)=>{
        event.preventDefault();

        const user_id=this.props.db_profile[0].uid
        const username=this.props.db_profile[0].username
        const pid=this.props.location.state.post.post.pid
        const title=event.target.title.value
        const body=event.target.body.value

        const data ={
            title:title,
            body:body,
            pid:pid,
            uid:user_id,
            username:username

        }

        axiosIns.put('/api/put/post',data)
             .then(res=>console.log(res))
             .catch(err=>console.log(err))
             .then(setTimeout(()=>history.replace("/profile"),700))

    }


    render(){
        return(
            <div className="text-center">

                <form onSubmit={this.handleSubmit}>
                    <TextField id="title" margin="normal" label="title" value={this.state.title}
                    onChange={this.handleTitleChange}>

                    </TextField>
                    <br />
                    <br />
                    <TextField id="body" multiline rows='4' margin="normal" label="body" value={this.state.body}
                    onChange={this.handleBodyChange}>

                    </TextField>

                    <br/>

                    <Button variant="contained" color="primary" type="submit">submit</Button>
                    <br/>
                </form>
                    <br/>
                    <Button variant="contained" color="secondary" onClick={()=>history.goBack()}>cancel</Button>


            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        db_profile: state.auth_reducer.db_profile
     }
    }
    
    
    export default connect(mapStateToProps)(EditPost);