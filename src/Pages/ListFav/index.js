import React, {forwardRef} from 'react';
import {FlatList} from 'react-native';
import AppContainer from '../../Components/AppContainer';
import Header from '../../Components/Header';
import HeaderTitle from '../../Components/HeaderTitle';
import HeaderSubtitle from '../../Components/HeaderSubtitle';
import Container from '../../Components/Container';
import ListContainer from '../../Components/ListContainer';
import ListTitle, {Bold} from '../../Components/ListTitle';
import ListItemsContainer from '../../Components/ListItemsContainer';
import DevListItem from '../../Components/DevListItem';

import Devs from '../../Components/DevListItem/devs.json';

//O que são essas props e ref, se aplica esse componente?
function ListFav(props, ref) {
  return (
    <AppContainer>
      <Header>
        <HeaderTitle>DevFinder Favoritos</HeaderTitle>
        <HeaderSubtitle>
          Favoritos
        </HeaderSubtitle>
      </Header>
      <Container>
        <ListContainer>
          <ListTitle>
            DESENVOLVEDORES EM <Bold>SÃO PAULO-SP</Bold>
          </ListTitle>
          <ListItemsContainer>
            <FlatList
              ref={ref}
              keyExtractor={(item) => String(item.id)}
              data={Devs}// Tá pegando dados do json com os nossos perfis? Como eu vou puxar os favoritos?
              renderItem={({item}) => <DevListItem profile={item} />}
              onScrollBeginDrag={() => props.emitter.emit('startDrag')}
              onScrollEndDrag={() => props.emitter.emit('endDrag')}
            />
          </ListItemsContainer>
        </ListContainer>
      </Container>
    </AppContainer>
  );
}

export default forwardRef(ListFav);
