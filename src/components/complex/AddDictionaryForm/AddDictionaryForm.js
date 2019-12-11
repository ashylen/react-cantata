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

// Utilities
import styles from './AddDictionaryForm.module.scss';
import {
  addDictionary as addDictionaryAction,
  fetchDictionary as fetchDictionaryAction,
} from '../../../actions/dictionaryActions';
import { required as isRequired } from '../../../utilities/Validators/required';

class AddDictionaryForm extends React.Component {
  handleSubmit = async formData => {
    const { addDictionary, closeModalFn, fetchDictionary } = this.props;

    try {
      await addDictionary(formData);
      await fetchDictionary();
    } catch (e) {
      console.error(e);
    }

    closeModalFn();
  };

  uniqueKeywordValidator = value => {
    const { dictionary } = this.props;

    if (dictionary.find(item => item.keyword === value)) {
      return 'Wpisana fraza już istnieje w słowniku';
    } else {
      return undefined;
    }
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
              name="keyword"
              placeholder=" "
              component={CustomInput}
              type="text"
              normalize={value => value && value.toLowerCase()}
              validate={[isRequired, this.uniqueKeywordValidator]}
              label="Fraza"
            />
            <Field
              name="short_text"
              placeholder=" "
              component={CustomInput}
              type="text"
              validate={[isRequired]}
              label="Krótki opis (widoczny na liście)"
            />
            <Field
              name="hover_text"
              placeholder=" "
              component={CustomInput}
              type="text"
              validate={[isRequired]}
              label="Opis po najechaniu na link"
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

AddDictionaryForm.propTypes = {
  addDictionary: PropTypes.func.isRequired,
  closeModalFn: PropTypes.func.isRequired,
  fetchDictionary: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchDictionary: () => dispatch(fetchDictionaryAction()),
  addDictionary: itemContent => dispatch(addDictionaryAction(itemContent)),
  reset: bindActionCreators(resetReduxForm, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'addNewDictionaryForm',
  })(AddDictionaryForm),
);
