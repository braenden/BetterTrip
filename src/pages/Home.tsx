import { useQuery } from '@apollo/client';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonSlide, IonTitle, IonToolbar } from '@ionic/react';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TripCard from '../components/TripCard';
import ITripList from '../models/ITripList';
import { addCircleOutline } from 'ionicons/icons'
import { useHistory } from 'react-router-dom';
import { auth } from '../utils/nhost';
import styled from 'styled-components';

//Her blir data hentet ut fra databasen. Viktig at permissions er satt riktig i Hasura
const GET_POSTS = gql` 
  query {
    posts {
      id
      title
      description
      image_filename
      user {
        display_name
        id
      }
    }
  }
`;

const Home = () => {

  let history = useHistory();
  const {loading, data} = useQuery<ITripList>(GET_POSTS) //Her henter vi ut struktur fra ITripList interfacet

  if (loading) {
    return <IonLabel>Loading</IonLabel> //Sier enkelt og greit at det skal displaye en melding om vi fortsatt venter på data.
  }

  if (data) {
    console.log(data);
  }

  const logOutUser = async () => { //Enkel logout funksjon
    await auth.logout();
    history.replace('/login')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BetterTrip</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/addtrip">
              <IonIcon icon={ addCircleOutline } />
            </IonButton>
          </IonButtons>
            <IonButtons slot="start">
              <IonButton onClick={ logOutUser }>Log out</IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContentHome fullscreen>
        { // Bruker "link" som gjør at når vi trykker på en post så kaller den på "to"-propertien.
          data?.posts.map(post => (
            <Link style={{ textDecoration: 'none'}} to={{
              pathname: `/detail/${post.id}`, //Pathet vi ønsker å gå til ved å trykke å en post.
              state: {
                post
              }
            }}>
              <TripCard {...post} />
            </Link> //Bruker spread syntax for å ikke repetere alle parameterne {...post}
                    //Pakker ut parameterne utenfor objektet.
          ))
        }
      </IonContentHome>
    </IonPage>
  );
};

const IonContentHome = styled(IonContent) `
--background: #EFF6E0
`;

export default Home;
