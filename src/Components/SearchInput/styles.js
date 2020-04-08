import styled from 'styled-components/native';
import {search} from '../../Styles/Colors';
import {search as searchz} from '../../Styles/Sizes';

export const Container = styled.View`
  flex-direction: row;
  height: ${searchz.height};
  border-radius: 15px;
  elevation: ${search.elevation};
  align-items: center;
  border-width: ${search.borderWidth};
  border-color: ${search.borderColor};
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 10px;
`;

export const Button = styled.TouchableOpacity`
  padding: 0 15px;
  height: ${searchz.height};
  align-items: center;
  justify-content: center;
  border-right-width: ${(props) =>
    props.border ? search.borderRightWidth : 0};
  border-right-color: ${search.borderColor};
`;
