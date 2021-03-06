import React, { Component } from 'react';
import styled from 'styled-components';
import Footer from 'components/organisms/Footer/Footer';
import store from 'store';
import SignIn from 'components/molecules/loginComponents/signIn';
import SignUp from 'components/molecules/loginComponents/signUp';
import Facebook from 'components/organisms/FacebookAuth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getMainData, serverResponse } from 'actions';
import axios from 'axios';
import path from '../path';

const StyledWrapper = styled.div`
  min-height: 100vh;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${({ theme }) => theme.media.bigDesktop} {
    margin-top: -50px;
  }
`;
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  p {
    margin: 10px;
    font-size: ${({ theme }) => theme.fontSize.xxl};
    color: ${({ theme }) => theme.colors.secondaryGrey};
    font-weight: ${({ theme }) => theme.font.thin};
    letter-spacing: -1px;
  }
`;

const LoginWrapper = styled.div`
  min-width: 310px;
  padding: ${({ center }) => (center ? '10px 15px' : '20px 15px 5px')};
  border: 1px solid rgb(216, 222, 226);
  border-radius: 7px;
  background: white;
  margin: 10px 0;
  font-size: ${({ theme }) => theme.fontSize.ms};
  text-align: ${({ center }) => center && 'center'};

  .clearButton {
    font-size: ${({ theme }) => theme.fontSize.ms};
    border: none;
    background: transparent;
    font-style: italic;
    outline: none;
    color: ${({ theme }) => theme.colors.primaryBlue};
    &:hover {
      cursor: pointer;
    }
  }
`;

class Login extends Component {
  state = {
    isRegister: false,
    isRegistered: false,
  };

  componentDidMount() {
    const token =
      localStorage.getItem('userID') !== null
        ? localStorage.getItem('userID')
        : sessionStorage.getItem('userID');

    const type = 'autologin';
    const email = null;
    const id = null;
    const autolog = localStorage.getItem('userID') !== null;
    if (token !== null) store.dispatch(getMainData(type, email, id, autolog, token));
  }

  handleClearNotification = () => store.dispatch(serverResponse({ error: undefined }));

  handleLogin = ({ email, id }, type, autolog) => {
    this.handleClearNotification();
    store.dispatch(getMainData(type, email, id, autolog));
    store.dispatch({ type: 'REQUEST_STARTED' });
  };

  handleRegister = ({ name, email, id }, type) => {
    this.handleClearNotification();
    store.dispatch({ type: 'REQUEST_STARTED' });
    if (name && email && id && type) {
      const arrName = name.split(' ');
      const userName = arrName.shift();
      const userSurname = arrName.join(' ');
      axios
        .post(`${path.cors}register.php`, {
          email,
          id,
          name: userName,
          surname: userSurname,
          type,
        })
        .then(({ data }) => {
          if (data.error) store.dispatch(serverResponse(data));
          if (data.success) {
            store.dispatch(serverResponse(data));
            this.setState({ isRegistered: true });
            this.handleLogin({ email, id }, type, false);
          }
        });
    }
  };

  handlePageChange = () => {
    this.setState(prevState => ({ isRegister: !prevState.isRegister, isRegistered: false }));
  };

  render() {
    const { isRegister, isRegistered } = this.state;
    const { token } = this.props;
    if (token !== '') {
      return <Redirect to={path.main} />;
    }
    return (
      <>
        <StyledWrapper>
          <MainWrapper>
            <p>{isRegister ? 'Zarejestruj w ' : 'Zaloguj do '} CV-builder</p>
            <LoginWrapper>
              {!isRegister ? (
                <SignIn login={this.handleLogin} />
              ) : (
                <SignUp register={this.handleRegister} login={this.handleLogin} />
              )}
            </LoginWrapper>
            <LoginWrapper center>
              {!isRegister ? 'Nie masz konta ?' : 'Masz konto ?'}
              <button type="button" className="clearButton" onClick={this.handlePageChange}>
                {isRegister ? 'Zaloguj się' : 'Zarejestruj się'}
              </button>
            </LoginWrapper>
            {isRegistered || (
              <Facebook
                isRegister={isRegister}
                login={this.handleLogin}
                register={this.handleRegister}
              />
            )}
          </MainWrapper>
          <Footer />
        </StyledWrapper>
      </>
    );
  }
}
const MapStateToProps = ({ personalData }) => personalData;
export default connect(MapStateToProps)(Login);
