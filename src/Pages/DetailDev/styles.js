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

export const ButtonFav = styled.TouchableOpacity``;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const DetailContainer = styled.View`
  flex: 1;
  flex-direction: row;
  /* align-items: center; */
  padding: 20px;
`;

export const DetailProfile = styled.View`
  margin-left: 20px;
  justify-content: center;
`;

export const Login = styled.Text`
  font-size: 26px;
  font-weight: bold;
`;

export const Site = styled.Text`
  width: 190;
  padding: 3px;
`;

export const Bio = styled.Text`
  width: 200;
`;

export const RepositoriesContaine = styled.View``;

export const Repo = styled.View`
  padding: 5px;
`;

export const RepoTitle = styled.Text``;

/*
 * No native os componentes vem por padrão com display: flex; flex-direction: column
 * row     -> esqueda para a direita
 * column  -> cima para baixo
 * align   -> alinha itens contra o axis principal
 * justify -> alinha itens de acordo com o axis principal
 * flex: 1 -> significa que ocupará o máximo do container que ele pode
 * */
