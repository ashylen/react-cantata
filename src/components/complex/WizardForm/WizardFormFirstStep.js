import React from 'react';

// Modules
import { Field, reduxForm, reset as resetReduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// Components
import Button from '../../simple/Button/Button';
import CustomInput from '../../simple/CustomInputs/CustomInput';

// Utilities
import styles from './WizardForm.module.scss';
import { required } from '../../../utilities/Validators/required';
import { maxLength } from '../../../utilities/Validators/maxLength';
import { isYouTubeUrl } from '../../../utilities/Validators/isYouTubeUrl';

const isRequired = required;

const WizardFormFirstStep = props => {
  const { handleSubmit, isEditMode, reset, pristine, submitting } = props;

  return (
    <React.Fragment>
      <div className={styles.formHeader}>Dodaj</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Field
          name="title"
          placeholder=" "
          component={CustomInput}
          type="text"
          validate={[isRequired]}
          label="Tytuł"
        />
        <Field
          name="description"
          placeholder=" "
          component={CustomInput}
          tag="textarea"
          type="text"
          validate={[isRequired]}
          label="Treść"
        />
        <div className={styles.modalNavigation}>
          {pristine ? null : (
            <Button cssClass="" type="button" disabled={pristine} onClick={reset}>
              Wyczyść
            </Button>
          )}
          <Button type="submit" disabled={submitting}>
            Next
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

WizardFormFirstStep.defaultProps = {
  isEditMode: false,
  editItemData: {
    id: null,
    text: '',
    header: '',
    href: '',
    date: '',
    youTubeUrl: '',
    subText: '',
  },
};

WizardFormFirstStep.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool,
  editItemData: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    header: PropTypes.string,
    href: PropTypes.string,
    date: PropTypes.string,
    youTubeUrl: PropTypes.string,
    subText: PropTypes.string,
  }),
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const { isEditMode, idCurrentItem, editItemData } = state.modals.specimens;
  return {
    initialValues: editItemData,
    isEditMode,
    idCurrentItem,
  };
};

const mapDispatchToProps = dispatch => ({
  reset: bindActionCreators(resetReduxForm, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'addNewCompositionForm',
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
  })(WizardFormFirstStep),
);
