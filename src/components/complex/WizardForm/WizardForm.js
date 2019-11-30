import React from 'react';

// Modules
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reset as resetReduxForm, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

// Components
import WizardFormFirstStep from './WizardFormFirstStep';
import WizardFormSecondStep from './WizardFormSecondStep';

// Utilities
import styles from './WizardForm.module.scss';
import {
  addComposition as addCompositionAction,
  editComposition as editCompositionAction,
  fetchCompositions as fetchCompositionsAction,
} from '../../../actions/compositionActions';

class WizardForm extends React.Component {
  state = { step: 1 };

  nextStep = () => {
    this.setState(prevState => ({
      step: prevState.step + 1,
    }));
  };

  previousStep = () => {
    this.setState(prevState => ({
      step: prevState.step - 1,
    }));
  };

  handleSubmit = async formData => {
    const {
      addComposition,
      editComposition,
      closeModalFn,
      idCurrentItem,
      isEditMode,
      // reset,
      fetchCompositions,
    } = this.props;

    try {
      if (isEditMode) {
        await editComposition(idCurrentItem, formData);
      } else {
        await addComposition(formData);
      }
    } catch (e) {
      console.error(e);
    }

    try {
      await fetchCompositions();
    } catch (e) {
      console.error(e);
    }

    await closeModalFn();
  };

  render() {
    const { step } = this.state;
    const { isEditMode } = this.props;

    return (
      <React.Fragment>
        <div className={styles.wrapper}>
          {step === 1 && <WizardFormFirstStep isEditMode={isEditMode} onSubmit={this.nextStep} />}
          {step === 2 && (
            <WizardFormSecondStep previousStep={this.previousStep} onSubmit={this.handleSubmit} />
          )}
        </div>
      </React.Fragment>
    );
  }
}

WizardForm.defaultProps = {
  idCurrentItem: null,
};

WizardForm.propTypes = {
  addComposition: PropTypes.func.isRequired,
  editComposition: PropTypes.func.isRequired,
  closeModalFn: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  idCurrentItem: PropTypes.number,
  fetchCompositions: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { isEditMode, idCurrentItem } = state.modalReducer.compositions;
  const { editItemData } = state.compositionsReducer;
  return { isEditMode, idCurrentItem, editItemData };
};

const mapDispatchToProps = dispatch => ({
  fetchCompositions: () => dispatch(fetchCompositionsAction()),
  addComposition: itemContent => dispatch(addCompositionAction(itemContent)),
  reset: bindActionCreators(resetReduxForm, dispatch),
  editComposition: (itemId, itemContent) => dispatch(editCompositionAction(itemId, itemContent)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'addNewCompositionForm', // Have to be set here in order to work properly
  })(WizardForm),
);
