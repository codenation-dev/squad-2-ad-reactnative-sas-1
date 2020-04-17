import React from 'react';
import {Alert, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';

import {useForm} from 'react-hook-form';
import AuthService from '../../Services/AuthService';

import {
  Container,
  Label,
  FormButton,
  ErrorText,
  ImageField,
  WelcomeText,
  Form,
  FormField,
  ButtonText,
} from './styles';

import Input from '../../Components/Input';

import DevFinderLogo from '../../Assets/Image/2.png';
import CodenationLogo from '../../Assets/Image/logoCodenation.png';
import backgroundImage from '../../Assets/Image/background.png';

export default function SignIn({login}) {
  const submitForm = (data) => {
    const authentication = AuthService.login(data.user, data.password)
      .then((user) => {
        if (user) {
          login();
          return;
        }
        Alert.alert(
          'Ocorreu um erro.',
          'Por favor, revise seus dados e tente novamente!'
        );
      })
      .catch((err) => {
        Alert.alert(
          'Ocorreu um erro.',
          'Por favor, revise seus dados e tente novamente!'
        );
        console.log(err);
      });

    console.log(authentication);
  };

  const {register, handleSubmit, setValue, errors} = useForm();

  React.useEffect(() => {
    register('user', {
      required: true,
    });
    register('password', {
      required: true,
    });
  }, [register]);

  return (
    <ImageBackground
      source={backgroundImage}
      style={{width: '100%', height: '100%'}}>
      <Container>
        <ImageField source={DevFinderLogo} />
        <WelcomeText>Entre com o seu github!</WelcomeText>
        <Form>
          <FormField>
            <Label>Username</Label>
            <Input
              onChangeText={(value) => setValue('user', value)}
              validation={!!errors.user}
            />
            {errors.user && (
              <ErrorText>por favor, informe seu usuário do github</ErrorText>
            )}
          </FormField>
          <FormField>
            <Label>Password</Label>
            <Input
              secureTextEntry
              onChangeText={(value) => setValue('password', value)}
              validation={!!errors.password}
            />
            {errors.password && (
              <ErrorText>por favor, informe sua senha do github</ErrorText>
            )}
          </FormField>
          <FormButton onPress={handleSubmit(submitForm)}>
            <ButtonText>Entrar</ButtonText>
          </FormButton>
        </Form>
        <ImageField source={CodenationLogo} width="100px" height="21px" />
      </Container>
    </ImageBackground>
  );
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
};
