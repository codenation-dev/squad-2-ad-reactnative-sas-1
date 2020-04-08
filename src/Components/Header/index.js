import React from 'react';
import PropTypes from 'prop-types';
import {header} from '../../Styles/Colors';
import {
  Container,
  HeaderArea,
  HeaderContent,
  Profile,
  ProfileImage,
} from './styles';

export default function Header({children, bgColor}) {
  return (
    <Container>
      <HeaderArea bgColor={bgColor}>
        <HeaderContent>{children}</HeaderContent>
        <Profile>
          <ProfileImage
            source={{
              uri: 'https://api.adorable.io/avatars/60/abott@adorable.png',
            }}
          />
        </Profile>
      </HeaderArea>
    </Container>
  );
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  bgColor: PropTypes.string,
};

Header.defaultProps = {
  children: '',
  bgColor: header.backgorund,
};
