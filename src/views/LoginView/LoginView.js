import React, { Component } from 'react';

// Modules
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Utils
import * as usersActions from '../../actions/usersActions';
import styles from './LoginView.module.scss';

// Components
import Button from '../../components/simple/Button/Button';
import CustomInput from '../../components/simple/CustomInputs/CustomInput';
import MainTemplate from '../../templates/MainTemplate';

class LoginView extends Component {
  submit = values => {
    const { identifier, password } = values;

    this.props.login(identifier, password);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <MainTemplate>
        <div className={styles.wrapper}>
          <h2>Logowanie</h2>
          <form className={styles.form} onSubmit={handleSubmit(this.submit)}>
            <Field
              name="identifier"
              component={CustomInput}
              tag="input"
              type="text"
              placeholder="Email"
            />
            <Field
              name="password"
              component={CustomInput}
              tag="input"
              type="password"
              placeholder="Password"
            />
            <Button> Zaloguj się</Button>
          </form>
        </div>
      </MainTemplate>
    );
  }
}

// const mapStateToProps = state => {
//   const { isEditMode, idCurrentItem, editItemData } = state.modalReducer.compositions;
//   return {
//     initialValues: editItemData,
//     isEditMode,
//     idCurrentItem,
//   };
// };

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(usersActions.login, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'login',
    enableReinitialize: true,
  })(LoginView),
);
