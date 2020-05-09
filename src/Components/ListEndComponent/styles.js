import styled from 'styled-components/native';
import {colors} from '../../Styles/Colors';

export const Container = styled.View`
  flex: 1;
  height: 50px;
  background: ${colors.primary};
  elevation: 4;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 10px 100px;
  justify-content: center;
  align-content: center;
`;
export const Text = styled.Text`
  color: #fff;
  align-self: center;
  font-weight: bold;
  font-size: 16px;
`;

export const Spacer = styled.View`
  height: 140px;
`;

export const Indicator = styled.ActivityIndicator``;
