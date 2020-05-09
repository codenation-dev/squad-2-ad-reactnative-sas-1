import styled, {css} from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import {fullWitdh} from '../../Styles/Sizes';

export const Container = styled.View`
  position: absolute;
  bottom: 40px;
  flex: 1;
  height: 100px;
  justify-content: center;
  align-items: center;
  width: ${`${fullWitdh}px`};
`;

export const NavigatorContainer = styled.View`
  width: 250px;
  height: 50px;
  flex-direction: row;
  background: ${(props) => (props.active ? '#000' : '#fff')};
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  border: rgba(0, 0, 0, 0.1) 3px solid;
  border-radius: 20px;
`;
export const NavigatorItem = styled(RectButton)`
  flex: 1;
  height: 45px;
  background: ${(props) => (props.active ? '#F0F1FF' : '#fff')};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: 20px;

  ${(props) =>
    props.first &&
    css`
      border-top-right-radius: 20px;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    `}

  ${(props) =>
    props.last &&
    css`
      border-top-left-radius: 20px;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    `}
`;
export const NavigatorContent = styled.Text`
  color: #5a54ff;
  margin-left: 8px;
  font-size: 14px;
  font-family: 'Raleway-Regular';
`;
export const StarredContainer = styled.View``;

export const StarredItem = styled.TouchableOpacity`
  background: #fff;
  padding: 8px 15px 8px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: rgba(0, 0, 0, 0.1) 3px solid;
  border-bottom-color: #fff;
  background: ${(props) => (props.active ? '#F0F1FF' : '#fff')};
`;
