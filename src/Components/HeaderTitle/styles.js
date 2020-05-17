import styled from 'styled-components/native';
import {header} from '../../Styles/Colors';
import {header as headerT} from '../../Styles/Typography';

export default styled.Text`
  color: ${(props) => props.color || header.titleDefaultColor};
  font-size: ${(props) => props.size || headerT.title};
  font-family: 'Reem-Kufi';
`;
