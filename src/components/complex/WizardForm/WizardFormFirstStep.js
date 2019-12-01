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

const maxLength15 = maxLength(15);
const isRequired = required;

const WizardFormFirstStep = props => {
  const { handleSubmit, isEditMode, reset, pristine, submitting } = props;

  return (
    <React.Fragment>
      <div className={styles.formHeader}>{isEditMode ? 'Edit' : 'Add a new'} composition</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Field
          name="header"
          placeholder=" "
          component={CustomInput}
          type="text"
          validate={[isRequired, maxLength15]}
          label="Composition name"
        />
        <Field
          name="href"
          placeholder=" "
          component={CustomInput}
          type="text"
          validate={[isRequired]}
          label="Link"
        />
        <Field
          name="youTubeUrl"
          placeholder=" "
          component={CustomInput}
          type="text"
          validate={[isRequired, isYouTubeUrl]}
          label="Youtube URL"
        />
        <Field
          name="subText"
          placeholder=" "
          component={CustomInput}
          type="text"
          validate={[isRequired]}
          label="Additional text"
        />
        <Field
          name="text"
          placeholder=" "
          component={CustomInput}
          tag="textarea"
          type="text"
          validate={[isRequired]}
          label="Text"
        />
        <div className={styles.modalNavigation}>
          {pristine ? null : (
            <Button cssClass="" type="button" disabled={pristine} onClick={reset}>
              Reset to Default
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
