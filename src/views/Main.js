import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar from 'components/organisms/Navigation/NavBar';
import Footer from 'components/organisms/Footer/Footer';
import MainPage from 'components/organisms/MainPage/MainPage';
import Proptypes from 'prop-types';
import store from 'store';
import { getData } from 'actions';
import ConfirmSidePanel from 'components/atoms/ConfirmSidePanel/ConfirmSidePanel';
import { connect } from 'react-redux';

const StyledWrapper = styled.div`
  /* margin: 0 20px; */
  /* border: 1px solid orange; */
`;

class Main extends Component {
  componentDidMount() {
    store.dispatch(getData());
  }

  render() {
    const { isVisible, error } = this.props;
    return (
      <>
        <StyledWrapper>
          <NavBar />
          <MainPage />
          <Footer />
          <ConfirmSidePanel pose={isVisible ? 'visible' : 'hidden'} error={error} />
        </StyledWrapper>
      </>
    );
  }
}

Main.propTypes = {
  isVisible: Proptypes.bool.isRequired,
  error: Proptypes.bool.isRequired,
};
const MapStateToProps = state => state.appState;
export default connect(MapStateToProps)(Main);
