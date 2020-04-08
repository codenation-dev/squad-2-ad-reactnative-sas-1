import styled from 'styled-components/native';
import {StatusBar} from 'react-native';
import {header} from '../../Styles/Colors';
import {paddingHeader} from '../../Styles/Sizes';

export const Container = styled.View`
  height: 140px;
`;

export const HeaderArea = styled.View`
  background-color: ${(props) => props.bgColor || header.backgorund};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;
export const HeaderContent = styled.View`
  margin-top: ${`${StatusBar.currentHeight}px`};
  padding: ${paddingHeader};
`;

export const Profile = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  margin-right: 20px;
  background: #fff;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

export const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
