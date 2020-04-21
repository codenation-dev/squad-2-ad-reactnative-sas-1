import styled from 'styled-components/native';
import {StatusBar} from 'react-native';
import {colors} from '../../Styles/Colors';

export const BackHeader = styled.View`
  background-color: ${colors.primary};
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 80px;
  elevation: 2;
`;

export const ButtonBack = styled.TouchableOpacity`
  position: absolute;
  padding: 0;
  left: 5px;
`;

export const TitleDev = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 16px;
`;

export const ButtonFav = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;
