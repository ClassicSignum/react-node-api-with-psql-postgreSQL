import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import history from '../utils/history'
import * as ACTIONS from '../store/actions/actions';
import '../assests/bootstrap.min.css';


const axiosIns=axios.create({
  baseURL:"http://localhost:5000"
})

class Header extends Component {

  state={
    home:"active",
    profile:"inactive",
    posts:"inactive",
  }
  

  handleSubmit = (event)=>{
    event.preventDefault();
    
    const data={username: event.target.username.value,
                email: event.target.email.value
                }

    axiosIns.post('/api/post/userprofilecheck',data)
      .then(res => {
        if (res.data.length>0) {

          this.props.set_db_profile(res.data)
          this.props.login_success()
          this.props.add_profile(res.data)

        }
        else {

          this.props.login_failure()
          this.props.remove_db_profile()
          this.props.remove_profile()

        }

      }
      )
      .then(history.replace('/'))
  }

  logout=()=>{

    this.props.login_failure()
    this.props.remove_db_profile()
    this.props.remove_profile()
 
    history.replace('/');

  }



  render() {
    return(
        <div style={{background:"#999"}} >
        <div className="text-center" style={{
          background:"rgb(63, 2, 92)"        
          
          }}>

          <Link to='/' onClick={()=>this.setState({home:"active",profile:"inactive",posts:"inactive"})} 
          className={this.state.home==="active"?"text-success text-uppercase" :"text-white"} 
           style={{
             padding: '15px' ,
             display:"inline-block"
             
             }}>
           <h4>Home</h4>
          </Link>
          <Link to='/profile' onClick={()=>this.setState({home:"inactive",profile:"active",posts:"inactive"})} 
          className={this.state.profile==="active"?"text-success text-uppercase":"text-white"}  
          style={{
             padding: '15px' ,
             display:"inline-block",             

             }}>
           <h4>Profile</h4>
          </Link>

          <Link to='/posts' onClick={()=>this.setState({home:"inactive",profile:"inactive",posts:"active"})} 
          className={this.state.posts==="active"?"text-success text-uppercase":"text-white"} 
           style={{ 
            padding: '15px' ,
             display:"inline-block",

            }}>
            <h4>Posts</h4>
          </Link>
       
       
          {!this.props.is_authenticated
            ?(
              <form style={{marginTop:"10%"}} onSubmit={this.handleSubmit}>
                <input type="text"  placeholder="username" id="username" />
                <br />
                <br />
                <input type="text" placeholder="email" id="email" />
                <br />
                <br />
                <button className="btn btn-success mb-2" type="submit">Login</button>

              </form>

            )
            // <button onClick={() => this.props.auth.login()}>Login</button>
            : <button  className="btn btn-danger" onClick={() => this.logout()}>Logout</button>
          }
          </div>
          <h5 className="text-center">SIMPLE REACT & NODE CRUD OPERATION API WITH PSQL(PostgreSQL)</h5>
          <br />
          <br />
          <br />
        </div>
    )}
}

function mapStateToProps(state) {
  return {
    is_authenticated: state.auth_reducer.is_authenticated,
    profile: state.auth_reducer.profile
  }
}
function mapDispatchToProps (dispatch) {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
     login_failure: () => dispatch(ACTIONS.login_failure()),
     add_profile: (profile) => dispatch(ACTIONS.add_profile(profile)),
     remove_profile: () => dispatch(ACTIONS.remove_profile()),
    //
    set_db_profile: (profile) => dispatch(ACTIONS.set_db_profile(profile)),
     remove_db_profile: () => dispatch(ACTIONS.remove_db_profile())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
