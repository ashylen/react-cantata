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
import InputFile from '../../simple/CustomInputs/InputFile';
import Dropzone from '../../simple/CustomInputs/Dropzone';

// Utilities
import styles from './AddArticlesForm.module.scss';
import {
  addArticle as addArticleAction,
  fetchArticles as fetchArticlesAction,
} from '../../../actions/articlesActions';
import { required as isRequired } from '../../../utilities/Validators/required';
import { maxLength } from '../../../utilities/Validators/maxLength';
import { isYouTubeUrl } from '../../../utilities/Validators/isYouTubeUrl';

class AddArticlesForm extends React.Component {
  handleSubmit = async formData => {
    const { addArticle, closeModalFn, idCurrentItem, fetchArticles } = this.props;

    try {
      await addArticle(formData);
      await fetchArticles();
    } catch (e) {
      console.error(e);
    }

    closeModalFn();
  };

  render() {
    const { handleSubmit, reset, pristine, submitting } = this.props;

    return (
      <React.Fragment>
        <div className={styles.wrapper}>
          <div className={classNames(styles.formHeader)}>Dodaj artykuł</div>
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
              label="Tytuł artykułu"
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
            <Field name="image" multiple={false} component={Dropzone} />
            <Field name="gallery_images" multiple={true} component={Dropzone} />
            {/*  TO DO GALLERY IMAGES */}
            <br />
            <div className={styles.modalNavigation}>
              {pristine ? null : (
                <Button cssClass="" type="button" disabled={pristine} onClick={reset}>
                  Wyczyść
                </Button>
              )}
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

AddArticlesForm.defaultProps = {
  idCurrentItem: null,
};

AddArticlesForm.propTypes = {
  addArticle: PropTypes.func.isRequired,
  closeModalFn: PropTypes.func.isRequired,
  idCurrentItem: PropTypes.number,
  fetchArticles: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchArticles: () => dispatch(fetchArticlesAction()),
  addArticle: itemContent => dispatch(addArticleAction(itemContent)),
  reset: bindActionCreators(resetReduxForm, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'addNewArticleForm',
  })(AddArticlesForm),
);
