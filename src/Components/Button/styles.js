import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import {colors} from '../../Styles/Colors';
import {buttonText} from '../../Styles/Typography';

export const ButtonComponent = styled(RectButton)`
  background-color: ${colors.primary};
  padding: 10px 20px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${buttonText.color};
  font-size: ${buttonText.fontSize};
`;
