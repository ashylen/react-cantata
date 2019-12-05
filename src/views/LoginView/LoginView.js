import React, { Component } from 'react';

// Modules
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

// Utils
import * as usersActions from '../../actions/usersActions';
import styles from './LoginView.module.scss';
import { required as isRequired } from '../../utilities/Validators/required';

// Components
import Button from '../../components/simple/Button/Button';
import CustomInput from '../../components/simple/CustomInputs/CustomInput';
import MainTemplate from '../../templates/MainTemplate';

class LoginView extends Component {
  submit = async values => {
    const { identifier, password } = values;

    try {
      const response = await this.props.login(identifier, password);
    } catch (error) {
      if (error.response.data.message === 'Identifier or password invalid.') {
        throw new SubmissionError({ password: 'Nazwa użytkownika lub hasło są nieprawidłowe' });
      } else if (error.response.data.message === 'Please provide your username or your e-mail.') {
        throw new SubmissionError({ password: 'Wprowadź wymagane dane' });
      } else {
        console.error(error.response.data);
      }
    }
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
              validate={[isRequired]}
            />
            <Field
              name="password"
              component={CustomInput}
              tag="input"
              type="password"
              placeholder="Password"
              validate={[isRequired]}
            />
            <br />
            <br />
            <Button> Zaloguj się</Button>
          </form>
        </div>
      </MainTemplate>
    );
  }
}

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
