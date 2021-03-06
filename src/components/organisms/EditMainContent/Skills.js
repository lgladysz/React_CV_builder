import React, { Component } from 'react';
import SkillsItem from 'components/molecules/SectionInputs/SkillsPanel';
import NewItemButton from 'components/atoms/Buttons/newItemButton';
import store from 'store';
import { connect } from 'react-redux';
import { setNewCurrentCVData } from 'functions';
import { addNewItemToCurrentCv } from 'actions';
import styled from 'styled-components';

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

class Languages extends Component {
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
        description: '',
      }),
    );
  };

  render() {
    const { cvId, currentCv, current, language } = this.props;
    const { skills } = currentCv;
    const { currentView } = current;
    return (
      <StyledWrapper>
        {skills.length ? (
          skills.map((item, idx) => {
            const { id } = item;
            return (
              <SkillsItem
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

export default connect(mapStateToProps)(Languages);
