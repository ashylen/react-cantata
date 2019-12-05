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
import Dropzone from '../../simple/CustomInputs/Dropzone';

// Utilities
import styles from './AddContentForm.module.scss';
import {
  addSpecimen as addSpecimenAction,
  editSpecimen as editSpecimenAction,
  fetchSpecimens as fetchSpecimensAction,
} from '../../../actions/specimensActions';
import { required as isRequired } from '../../../utilities/Validators/required';
import { maxLength } from '../../../utilities/Validators/maxLength';
import { isYouTubeUrl } from '../../../utilities/Validators/isYouTubeUrl';

class AddContentForm extends React.Component {
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
    const { isEditMode, handleSubmit, reset, pristine, submitting } = this.props;

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
              {/* {pristine ? null : (
                <Button cssClass="" type="button" disabled={pristine} onClick={reset}>
                  Wyczyść
                </Button>
              )} */}
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

AddContentForm.defaultProps = {
  idCurrentItem: null,
};

AddContentForm.propTypes = {
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
  })(AddContentForm),
);
