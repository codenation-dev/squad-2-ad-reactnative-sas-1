import styled from 'styled-components/native';
import {header} from '../../Styles/Colors';
import {header as headerT} from '../../Styles/Typography';

export default styled.Text`
  color: ${(props) => props.color || header.textDefaultColor};
  font-size: ${(props) => props.size || headerT.subtitle};
  max-width: 249px;
  font-family: 'Raleway-Medium';
  line-height: 15px;
`;
