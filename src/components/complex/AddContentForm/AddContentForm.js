import React from 'react';

// Modules
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reset as resetReduxForm, reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Components
import Button from '../../simple/Button/Button';
import CustomInput from '../../simple/CustomInputs/CustomInput';
import Dropzone from '../../simple/CustomInputs/Dropzone/Dropzone';

// Utilities
import styles from './AddContentForm.module.scss';
import {
  addSpecimen as addSpecimenAction,
  fetchSpecimens as fetchSpecimensAction,
} from '../../../actions/specimensActions';
import { required as isRequired } from '../../../utilities/Validators/required';

class AddContentForm extends React.Component {
  handleSubmit = async formData => {
    const { addSpecimen, closeModalFn, fetchSpecimens } = this.props;

    try {
      await addSpecimen(formData);
      await fetchSpecimens();
    } catch (e) {
      console.error(e);
    }

    closeModalFn();
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <React.Fragment>
        <div className={styles.wrapper}>
          <div className={classNames(styles.formHeader)}>Dodaj okaz</div>
          <form
            onSubmit={handleSubmit(this.handleSubmit)}
            className={classNames(styles.form, {
              [styles.disabled]: submitting,
            })}
          >
            <Field
              name="title"
              placeholder=" "
              component={CustomInput}
              type="text"
              validate={[isRequired]}
              label="Tytuł"
            />
            <Field
              name="family"
              placeholder=" "
              component={CustomInput}
              type="text"
              validate={[isRequired]}
              label="Rodzina"
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
            <Field name="image" label="Obraz główny" multiple={false} component={Dropzone} />
            <br />
            <div className={styles.modalNavigation}>
              <Button type="submit" disabled={submitting}>
                Dodaj
              </Button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

AddContentForm.propTypes = {
  addSpecimen: PropTypes.func.isRequired,
  closeModalFn: PropTypes.func.isRequired,
  fetchSpecimens: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchSpecimens: () => dispatch(fetchSpecimensAction()),
  addSpecimen: itemContent => dispatch(addSpecimenAction(itemContent)),
  reset: bindActionCreators(resetReduxForm, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'addNewSpecimenForm',
  })(AddContentForm),
);
