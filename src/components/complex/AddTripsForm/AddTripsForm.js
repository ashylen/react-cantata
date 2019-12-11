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
import styles from './AddTripsForm.module.scss';
import {
  addTrip as addTripAction,
  fetchTrips as fetchTripsAction,
} from '../../../actions/tripsActions';
import { required as isRequired } from '../../../utilities/Validators/required';

class AddTripsForm extends React.Component {
  handleSubmit = async formData => {
    const { addTrip, closeModalFn, fetchTrips } = this.props;

    try {
      await addTrip(formData);
      await fetchTrips();
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
          <div className={classNames(styles.formHeader)}>Dodaj wyjazd</div>
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
              label="Tytuł wyjazdu"
            />
            <Field
              name="short_description"
              placeholder=" "
              component={CustomInput}
              type="text"
              validate={[isRequired]}
              label="Krótki opis"
            />
            <Field
              name="content"
              placeholder=" "
              component={CustomInput}
              tag="textarea"
              type="text"
              validate={[isRequired]}
              label="Treść"
            />
            <br />
            <Field name="image" label="Obraz główny" multiple={false} component={Dropzone} />
            <Field name="gallery_images" label="Galeria" multiple={true} component={Dropzone} />
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

AddTripsForm.propTypes = {
  addTrip: PropTypes.func.isRequired,
  closeModalFn: PropTypes.func.isRequired,
  fetchTrips: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchTrips: () => dispatch(fetchTripsAction()),
  addTrip: itemContent => dispatch(addTripAction(itemContent)),
  reset: bindActionCreators(resetReduxForm, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'addNewTripForm',
  })(AddTripsForm),
);
