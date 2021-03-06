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
import styles from './AddArticlesForm.module.scss';
import * as articlesActions from '../../../actions/articlesActions';
import { required as isRequired } from '../../../utilities/Validators/required';

class AddArticlesForm extends React.Component {
  handleSubmit = async formData => {
    const { addArticle, closeModalFn, fetchArticles, articlesLimit, articlesPage } = this.props;

    try {
      await addArticle(formData);
      await fetchArticles(articlesLimit, articlesPage);
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
            <Field name="image" label="Obraz główny" multiple={false} component={Dropzone} />
            <br/>
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

AddArticlesForm.propTypes = {
  addArticle: PropTypes.func.isRequired,
  closeModalFn: PropTypes.func.isRequired,
  fetchArticles: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchArticles: bindActionCreators(articlesActions.fetchArticles, dispatch),
  addArticle: bindActionCreators(articlesActions.addArticle, dispatch),
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
