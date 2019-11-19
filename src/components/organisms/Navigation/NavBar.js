import React from 'react';
// import Logo from 'components/atoms/Logo/Logo';
import LoggedIn from 'components/atoms/LoggedIn/LoggedIn';
import NavButtons from 'components/molecules/TopNavButtons/navButtons';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

const StyledWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.mainGrey};
  p.logo {
    color: white;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.font.bold};
    text-align: center;
    min-width: 150px;
    span {
      color: ${({ theme }) => theme.colors.primaryBlue};
    }
  }
`;

const NavBar = () => (
  <StyledWrapper>
    {/* {props.logo && <Logo />} */}
    {/* <Logo /> */}
    <p className="logo">
      <span>CV</span>-builder
    </p>
    <NavButtons />
    <LoggedIn />
  </StyledWrapper>
);

// NavBar.propTypes = {
//   logo: PropTypes.bool,
// };

NavBar.defaultProps = {
  logo: false,
};

export default NavBar;
