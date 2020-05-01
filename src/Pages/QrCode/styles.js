import styled from 'styled-components/native';

export const CameraContainer = styled.View`
  width: 100%;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px;
`;

export const CloseText = styled.Text`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  width: 40px;
  height: 40px;
  border-radius: 20px;
  padding: 5px;
  text-align: center;
  font-size: 20px;
`;
