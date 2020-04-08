import styled from 'styled-components/native';

import {InputSizes} from '../../Styles/Sizes';

export const InputComponent = styled.TextInput`
  background-color: #fff;
  width: ${InputSizes.width};
  border-radius: ${InputSizes.borderRadius};
  border-color: ${(props) =>
    props.validation ? '#ff0000' : 'rgba(102, 102, 102, 0.2)'};

  border-width: 1px;
  height: 44px;
  padding: 10px;
`;
