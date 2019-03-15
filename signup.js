import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';

const { login } = authAction;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    const { login } = this.props;
    login();
    this.props.history.push('/dashboard');
  };
  render() {
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input size="large" type="text" placeholder="Full Name" />
              </div>

                <div className="isoInputWrapper">
                <Input size="large" type="email" placeholder="E-mail address" />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" placeholder="Username" />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" type="password" placeholder="Password" />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={this.handleLogin}>
                  <IntlMessages id="page.signUpButton" />
                </Button>
              </div>

              <p className="isoHelperText">
                <IntlMessages id="page.signInPreview" />
              </p>

              <div className="isoInputWrapper isoOtherLogin">
                <Button onClick={this.handleLogin} type="primary btnFacebook">
                  <IntlMessages id="page.signUnFacebook" />
                </Button>
                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                  <IntlMessages id="page.signUnGooglePlus" />
                </Button>
              </div>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="">
                  <IntlMessages id="page.signUnCreateAccount" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false,
  }),
  { login }
)(SignIn);
