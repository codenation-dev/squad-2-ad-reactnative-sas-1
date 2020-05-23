import React from 'react';
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BackHeader,
  ButtonBack,
  TitleDev,
  ButtonFav,
  DetailContainer,
  Avatar,
  InformationsContainer,
  Username,
  Site,
  Bio,
  Location,
  ReposContainer,
  Repo,
  RepoTitle,
  RepoLanguage,
  RepoStars,
  RepoStarsCount,
  RepoInfo,
} from './styles';

import useFavorites from '../../Services/useFavorites';

import AppContainer from '../../Components/AppContainer';

export default function DetailDev({route, navigation}) {
  const {profile = {oi: 1}} = route.params;

  const [favs, favorite, reload] = useFavorites();

  const [loadingProfile, setLoadingProfile] = React.useState(true);
  const [loadingRepos, setLoadingRepos] = React.useState(true);

  const [loadedProfile, setLoadProfile] = React.useState({});

  const [repos, setRepos] = React.useState([]);

  React.useEffect(() => {
    async function loadProfile() {
      if (profile.url && profile.repos_url) {
        fetch(profile.url)
          .then((response) => response.json())
          .then(setLoadProfile);

        fetch(profile.repos_url)
          .then((response) => response.json())
          .then(setRepos);
      }
    }

    loadProfile();
    // if (profile.url && profile.repos_url) {
    //   fetch(profile.url)
    //     .then((response) => response.json())
    //     .then(setLoadProfile);

    // fetch(profile.repos_url)
    //     .then((response) => response.json())
    //     .then(setRepos);
    // }
  }, [profile]);

  React.useEffect(() => {
    if (loadedProfile.avatar_url) {
      setLoadingProfile(false);
    }
    if (repos.length > 0) {
      console.log('tem');
      setLoadingRepos(false);
    }
  }, [loadedProfile, repos]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <BackHeader>
          <ButtonBack
            onPress={() => {
              navigation.goBack();
              setLoadingProfile(true);
              setLoadingRepos(true);
              setLoadProfile({});
              setRepos([]);
            }}>
            <Icon
              name="chevron-left"
              color="#fff"
              size={25}
              style={{padding: 0, marginTop: 10}}
            />
          </ButtonBack>
          <TitleDev>{profile.login}</TitleDev>
          <ButtonFav
            onPress={async () => {
              await favorite(profile);
              navigation.navigate('StarRed');
            }}>
            <Icon name="star-face" color="#fff" size={25} />
          </ButtonFav>
        </BackHeader>

        <AppContainer>
          {/* pode apagar daqui pra baixo */}

          <DetailContainer>
            {loadingProfile ? (
              <ActivityIndicator
                size="large"
                color="#000"
                style={{alignSelf: 'center'}}
              />
            ) : (
              <>
                <Avatar source={{uri: profile.avatar_url}} />

                <InformationsContainer>
                  <Username>{loadedProfile.name}</Username>
                  <Site>
                    {loadedProfile.blog &&
                      loadedProfile.blog.replace(/^.*:\/\//i, '')}
                  </Site>

                  <Bio>{loadedProfile.bio}</Bio>

                  <Location>{loadedProfile.location}</Location>
                </InformationsContainer>
              </>
            )}
          </DetailContainer>

          <ReposContainer>
            {loadingRepos ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <>
                <FlatList
                  data={repos}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => (
                    <Repo>
                      <RepoInfo>
                        <RepoTitle>{item.name}</RepoTitle>
                        {item.language && (
                          <RepoLanguage>{item.language}</RepoLanguage>
                        )}
                      </RepoInfo>

                      <RepoStars>
                        <Icon name="star" size={20} color="#FFD700" />
                        <RepoStarsCount>{item.stargazers_count}</RepoStarsCount>
                      </RepoStars>
                    </Repo>
                  )}
                />
              </>
            )}
          </ReposContainer>

          {/* pode apagar daqui pra cima */}
        </AppContainer>
      </View>
    </SafeAreaView>
  );
}
