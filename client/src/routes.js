import React, {Component} from 'react';
import { connect } from 'react-redux';

import Header from './containers/header';
import Profile from './containers/profile';

//
import Posts from './Blog/post'
import AddPost from './Blog/addpost'
import ShowPost from './Blog/showpost'
import EditPost from './Blog/editpost'
//


import Home from './functional/home';

import * as ACTIONS from './store/actions/actions';


import history from './utils/history';

import { Router, Route, Switch } from 'react-router';





// export const auth = new Auth()

// const handleAuthentication = (props) => {
//   if(props.location.hash) {
//     auth.handleAuth()
//   }
// }

// const PrivateRoute = ({component: Component, auth }) => (
//   <Route render={props => auth.isAuthenticated() === true
//     ? <Component auth={auth} {...props} />
//     : <Redirect to={{pathname:'/redirect'}} />
//   }
//   />
// )



class Routes extends Component {
  // componentDidMount() {
  //   if(auth.isAuthenticated()) {
  //     this.props.login_success()
  //     auth.getProfile()
  //     setTimeout(() => {this.props.add_profile(auth.userProfile)}, 400)
  //   }
  //   else {
  //     this.props.login_failure()
  //     this.props.remove_profile()
  //   }
  // }

  render() {
    return(
      <div>
        <Router history={history} >
        <div>
          <Header  />
          <Switch>
            <Route exact path='/' component={Home} />
            {/* <Route exact path='/form1' component={Form1} />
            <Route exact path='/container1' render={() => <Container1  /> } />
            <Route path='/authcheck' render={() => <AuthCheck  /> } />
            <Route path='/redirect' component={UnauthRedirect} />
            <Route path='/renderlist' component={RenderList} /> */}

            {/*  */}

            <Route path="/posts" component={Posts}  />
            <Route path="/post/:pid" component={ShowPost}  />
            <Route path="/editpost/:pid" component={EditPost}  />
            <Route path="/addpost" component={AddPost}  />

            {/*  */}

            {/* <Route path='/callback' render={(props) => { handleAuthentication(props); return <Callback />}} />
            <Route path="/component1" render={(props) => <Component1 {...props} /> } />

            <Route path="/listitem/:id" component={RenderListItem} />

            <PrivateRoute path="/privateroute" auth={auth} component={PrivateComponent} /> */}
            {/* <PrivateRoute path="/profile" auth={auth} component={Profile} /> */}
            <Route path="/profile"  component={Profile} />

          </Switch>
        </div>
        </Router>
      </div>
    )}
}


function mapDispatchToProps (dispatch) {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
    login_failure: () => dispatch(ACTIONS.login_failure()),
    add_profile: (profile) => dispatch(ACTIONS.add_profile(profile)),
    remove_profile: () => dispatch(ACTIONS.remove_profile())
  }
}


export default connect(null, mapDispatchToProps)(Routes);
