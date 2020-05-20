import styled from 'styled-components/native';
import {darken} from 'polished';
import {StatusBar} from 'react-native';
import {colors} from '../../Styles/Colors';

import {font} from '../../Styles/Typography';

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

export const DetailContainer = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  border-bottom-color: rgba(0, 0, 0, 0.05);
  border-bottom-width: 1px;
  justify-content: center;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-color: ${colors.primary};
  border-width: 2px;
`;

export const InformationsContainer = styled.View`
  margin-left: 20px;
  flex: 1;
`;

export const Username = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: ${font.extraBold};
  font-size: 18px;
  color: ${colors.primary};
`;

export const Site = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${darken(0.3, '#6163fb')};
  font-family: ${font.Light};
  margin-top: 10px;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-family: ${font.regular};
  margin-top: 10px;
`;

export const Location = styled.Text.attrs({
  numberOfLines: 1,
})`
  background-color: ${colors.primary};
  color: #fff;
  font-family: ${font.regular};
  text-align: center;
  border-radius: 10px;
  margin-top: 10px;
  padding: 5px 0;
`;

export const ReposContainer = styled.View`
  padding: 20px;
  flex: 1;
`;
export const Repo = styled.View`
  background: #fff;
  elevation: 2;
  margin: 10px 5px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #eee;
  flex-direction: row;
`;
export const RepoTitle = styled.Text`
  color: ${darken(0.3, '#6163fb')};
  font-family: ${font.bold};
  flex: 1;
`;

export const RepoLanguage = styled.Text`
  background-color: ${colors.primary};
  color: #fff;
  font-family: ${font.regular};
  text-align: center;
  border-radius: 20px;
  align-self: flex-start;
  padding: 5px 14px;
`;

export const RepoStars = styled.View`
  /* position: absolute;
  right: 10px;
  top: 10px; */
  background: #5a54ff;
  padding: 5px 10px;
  border-radius: 15px;
  align-items: center;
`;

export const RepoStarsCount = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #fff;
  font-family: ${font.extraBold};
`;

export const RepoInfo = styled.View`
  flex: 1;
`;
