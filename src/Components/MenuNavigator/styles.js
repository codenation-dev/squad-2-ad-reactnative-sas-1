import styled, {css} from 'styled-components/native';
import {fullWitdh} from '../../Styles/Sizes';

export const Container = styled.View`
  position: absolute;
  bottom: 40px;
  flex: 1;
  height: 44px;
  justify-content: center;
  align-items: center;
  width: ${`${fullWitdh}px`};
`;

export const NavigatorContainer = styled.View`
  width: 250px;
  height: 44px;
  flex-direction: row;
  background: ${(props) => (props.active ? '#000' : '#fff')};
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  elevation: 2;
`;
export const NavigatorItem = styled.TouchableOpacity`
  flex: 1;
  height: 44px;
  background: ${(props) => (props.active ? '#F0F1FF' : '#fff')};
  align-items: center;
  justify-content: center;
  flex-direction: row;

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

export const StarredContainer = styled.TouchableOpacity`
  background: #fff;
  padding: 8px 15px 8px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  elevation: 2;

  background: ${(props) => (props.active ? '#F0F1FF' : '#fff')};
`;
