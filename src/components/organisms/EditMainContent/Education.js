import React, { Component } from 'react';
import { connect } from 'react-redux';
import EducationPanel from 'components/molecules/SectionInputs/EducationPanel';
import styled from 'styled-components';
import NewItemButton from 'components/atoms/Buttons/newItemButton';
import store from 'store';
import { setNewCurrentCVData } from 'functions';
import { addNewItemToCurrentCv } from 'actions';

const StyledWrapper = styled.div`
  margin: 10px 0 0 10px;

  @media ${'(min-width:320px) and (max-width:575.98px) and (orientation: landscape)'} {
    margin-top: 50px;
  }
  @media ${({ theme }) => theme.media.medium} {
    margin-top: 50px;
  }
  @media ${({ theme }) => theme.media.tablet} {
    margin-top: 50px;
  }
`;

class Education extends Component {
  componentDidUpdate(prevProps) {
    const { language } = prevProps;
    if (language === this.props.language) {
      const { cvId, currentCv } = this.props;
      const token = sessionStorage.getItem('userID');
      store.dispatch(setNewCurrentCVData('update', token, cvId, currentCv));
    }
  }

  handleNewItem = () => {
    const { current } = this.props;
    const { currentView } = current;

    store.dispatch(
      addNewItemToCurrentCv(currentView, {
        name: '',
        department: '',
        startYear: 2000,
        startMonth: 1,
        endYear: 2000,
        endMonth: 1,
        description: '',
        inProgress: false,
      }),
    );
  };

  render() {
    const { cvId, currentCv, current, language } = this.props;
    const { education } = currentCv;
    const { currentView } = current;
    return (
      <StyledWrapper>
        {education.length ? (
          education.map((item, idx) => {
            const { id } = item;
            return (
              <EducationPanel
                key={id}
                index={idx}
                item={item}
                cvId={cvId}
                current={currentView}
                newItem={this.handleNewItem}
                language={language}
              />
            );
          })
        ) : (
          <NewItemButton view={currentView} handleClick={this.handleNewItem} language={language} />
        )}
      </StyledWrapper>
    );
  }
}
const mapStateToProps = ({ currentCv, editComponentView }) => ({
  currentCv,
  cvId: currentCv.currentItem.id,
  current: editComponentView,
});
export default connect(mapStateToProps)(Education);
