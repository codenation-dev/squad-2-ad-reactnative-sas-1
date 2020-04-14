import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

import {colors} from '../../Styles/Colors';

export const Container = styled.View`
  flex: 1;
  width: 80%;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: normal;
  align-self: flex-start;
`;

export const Input = styled.TextInput`
  background-color: #ededed;
  border-width: 1px;
  border-color: ${(props) => (props.validation ? 'red' : '#ededed')};
  height: 50px;
  width: 100%;
  padding-left: 10px;
`;

export const FormButton = styled(RectButton)`
  background-color: ${colors.primary};
  padding: 10px 20px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  width: 110%;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 8px;
  align-self: flex-start;
`;

export const ImageField = styled.Image`
  width: ${(props) => (!props.width ? '192px' : props.width)};
  height: ${(props) => (!props.height ? '60px' : props.height)};
  margin-bottom: 20px;
`;

export const WelcomeText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #a82eaa;
  margin-bottom: 20px;
`;

export const Form = styled.View`
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

export const FormField = styled.View`
  margin-bottom: 20px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
