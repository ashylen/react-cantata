import React from 'react';

// Modules
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';

// Utilities
import styles from './WizardForm.module.scss';

// Components
import SummaryList from '../SummaryList/SummaryList';
import Button from '../../simple/Button/Button';

let WizardFormSecondStep = props => {
  const { handleSubmit, previousStep, submitting } = props; // Misc
  const { header, href, date, subText, youTubeUrl, text } = props; // Fields

  return (
    <React.Fragment>
      <div className={styles.formHeader}>Summary</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <SummaryList data={{ header, href, date, subText, youTubeUrl, text }} />
        <div className={styles.modalNavigation}>
          <Button cssClass="secondary" type="button" onClick={previousStep}>
            Back
          </Button>
          <Button type="submit" disabled={submitting}>
            Submit
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

WizardFormSecondStep.defaultProps = {
  text: '',
  header: '',
  href: '',
  date: '',
  youTubeUrl: '',
  subText: '',
};

WizardFormSecondStep.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  text: PropTypes.string,
  header: PropTypes.string,
  href: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  youTubeUrl: PropTypes.string,
  subText: PropTypes.string,
};

WizardFormSecondStep = reduxForm({
  form: 'addNewSpecimenForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(WizardFormSecondStep);

const selector = formValueSelector('addNewSpecimenForm'); // Get values from Step1 form to Step2

WizardFormSecondStep = connect(state => ({
  header: selector(state, 'header'),
  href: selector(state, 'href'),
  date: selector(state, 'date'),
  subText: selector(state, 'subText'),
  youTubeUrl: selector(state, 'youTubeUrl'),
  text: selector(state, 'text'),
}))(WizardFormSecondStep);

export default WizardFormSecondStep;
