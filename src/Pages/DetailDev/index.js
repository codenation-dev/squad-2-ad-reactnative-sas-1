/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-return-assign */
import React from 'react';
import {ScrollView, View, FlatList, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  BackHeader,
  ButtonBack,
  TitleDev,
  Avatar,
  ButtonFav,
  DetailContainer,
  DetailProfile,
  Login,
  Site,
  Bio,
  Repo,
  RepositoriesContaine,
  RepoTitle,
} from './styles';
import AppContainer from '../../Components/AppContainer';

export default function DetailDev({route, navigation}) {
  const {profile = {oi: 1}} = route.params;

  const [loadedProfile, setLoadProfile] = React.useState({});

  const [repos, setRepos] = React.useState([]);

  React.useEffect(() => {
    if (profile.url) {
      fetch(profile.url)
        .then((response) => response.json())
        .then(setLoadProfile);
    }

    fetch(profile.repos_url)
      .then((response) => response.json())
      .then(setRepos);
  }, [profile]);

  console.log(repos);

  const data = React.useMemo(() => {
    return Object.entries(profile).reduce(
      (atual, [key, value]) => (atual += `\n${key} : ${value} \n`),
      ''
    );
  }, [profile]);
  return (
    <SafeAreaView>
      <View>
        <BackHeader>
          <ButtonBack onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              color="#fff"
              size={25}
              style={{padding: 0, marginTop: 10}}
            />
          </ButtonBack>
          <TitleDev>{profile.login}</TitleDev>
          <ButtonFav />
        </BackHeader>
        <ScrollView>
          <AppContainer>
            {/* pode apagar daqui pra baixo */}

            <DetailContainer>
              <Avatar source={{uri: profile.avatar_url}} />

              <DetailProfile>
                <Login>{profile.login}</Login>
                <Site>{loadedProfile.blog || 'Não tem Site'}</Site>
                <Bio>{loadedProfile.bio || 'Não tem Biografia'}</Bio>
              </DetailProfile>
            </DetailContainer>
            <DetailContainer>
              <RepositoriesContaine>
                <FlatList
                  data={repos}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => (
                    <Repo>
                      <RepoTitle>
                        <Icon name="archive" color="#555" size={15} />{' '}
                        {item.name}
                        <Icon name="text" color="#555" size={15} />
                        {item.language || '--'}
                        <Icon name="star-face" color="#555" size={15} />{' '}
                        {item.watchers_count}
                      </RepoTitle>
                    </Repo>
                  )}
                />
              </RepositoriesContaine>
            </DetailContainer>
          </AppContainer>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
