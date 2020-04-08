import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100px;
  padding: 0 20px;
  background: #fff;
  elevation: 2;
  border-radius: 15px;
  align-items: center;
  flex-direction: row;
  margin: 10px 10px 10px;
`;
export const Photo = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 4px;
`;
export const ContainerColumn = styled.View`
  margin-left: 20px;
`;

export const Name = styled.Text`
  color: #5a54ff;
  font-size: 14px;
  font-family: 'Raleway-Bold';
`;

export const Username = styled.Text`
  color: rgba(85, 85, 85, 0.8);
  font-size: 12px;
  font-family: 'Raleway-Bold';
`;

export const Followers = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;
  flex-direction: row;
  /* border-top-right-radius: 10px; */
  padding: 10px;
  border-radius: 20px;
  background: rgba(221, 221, 221, 0.3);
  align-items: center;
`;

export const FollowersCount = styled.Text`
  margin-left: 10px;
  font-size: 12px;
`;
