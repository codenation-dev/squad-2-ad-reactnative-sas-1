import React from 'react';
import {View, FlatList} from 'react-native';
import {title} from '../../Styles/Typography';

import AppContainer from '../../Components/AppContainer';
import Header from '../../Components/Header';
import HeaderTitle from '../../Components/HeaderTitle';
import HeaderSubtitle from '../../Components/HeaderSubtitle';
import Container from '../../Components/Container';
import SearchInput from '../../Components/SearchInput';
import ListContainer from '../../Components/ListContainer';
import ListTitle, {Bold} from '../../Components/ListTitle';
import ListItemsContainer from '../../Components/ListItemsContainer';
import DevListItem from '../../Components/DevListItem';
import Devs from '../../Components/DevListItem/devs.json';

export default function StarRed() {
  return (
    <AppContainer>
      <Header>
        <HeaderTitle>Favoritos</HeaderTitle>
        <HeaderSubtitle>
          Aqui fica os devs que você marcou como favorito.
        </HeaderSubtitle>
      </Header>
      <Container>
        <SearchInput placeholder="Digite o nome/login do desenvolvedor" />
        <ListContainer>
          <ListTitle>
            DESENVOLVEDORES EM <Bold>SÃO PAULO-SP</Bold>
          </ListTitle>
          <ListItemsContainer>
            <FlatList
              keyExtractor={(item) => String(item.id)}
              data={Devs}
              renderItem={({item}) => <DevListItem profile={item} />}
            />
          </ListItemsContainer>
        </ListContainer>
      </Container>
    </AppContainer>
  );
}
