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
  addSpecimen as addSpecimenAction,
  editSpecimen as editSpecimenAction,
  fetchSpecimens as fetchSpecimensAction,
} from '../../../actions/specimensActions';

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
      addSpecimen,
      editSpecimen,
      closeModalFn,
      idCurrentItem,
      isEditMode,
      fetchSpecimens,
    } = this.props;

    try {
      await addSpecimen(formData);
      await fetchSpecimens();
    } catch (e) {
      console.error(e);
    }

    closeModalFn();
  };

  render() {
    const { step } = this.state;
    const { isEditMode } = this.props;

    return (
      <React.Fragment>
        <div className={styles.wrapper}>
          {step === 1 && (
            <WizardFormFirstStep isEditMode={isEditMode} onSubmit={this.handleSubmit} />
          )}
          {/* {step === 2 && (
            <WizardFormSecondStep previousStep={this.previousStep} onSubmit={this.handleSubmit} />
          )} */}
        </div>
      </React.Fragment>
    );
  }
}

WizardForm.defaultProps = {
  idCurrentItem: null,
};

WizardForm.propTypes = {
  addSpecimen: PropTypes.func.isRequired,
  editSpecimen: PropTypes.func.isRequired,
  closeModalFn: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  idCurrentItem: PropTypes.number,
  fetchSpecimens: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { isEditMode, idCurrentItem } = state.modals.specimens;
  const { editItemData } = state.specimens;
  return { isEditMode, idCurrentItem, editItemData };
};

const mapDispatchToProps = dispatch => ({
  fetchSpecimens: () => dispatch(fetchSpecimensAction()),
  addSpecimen: itemContent => dispatch(addSpecimenAction(itemContent)),
  reset: bindActionCreators(resetReduxForm, dispatch),
  editSpecimen: (itemId, itemContent) => dispatch(editSpecimenAction(itemId, itemContent)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'addNewSpecimenForm',
  })(WizardForm),
);
