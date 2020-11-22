import { useQuery } from '@apollo/client';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonSlide, IonTitle, IonToolbar } from '@ionic/react';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TripCard from '../components/TripCard';
import ITripList from '../models/ITripList';

//Her blir data hentet ut fra databasen. Viktig at permissions er satt riktig i Hasura
const GET_POSTS = gql` 
  query {
    posts {
      id
      title
      description
      user {
        display_name
      }
    }
  }
`;

const Home = () => {

  const {loading, data} = useQuery<ITripList>(GET_POSTS) //Her henter vi ut struktur fra ITripList interfacet

  if (loading) {
    return <IonLabel>Loading</IonLabel> //Sier enkelt og greit at det skal displaye en melding om vi fortsatt venter på data.
  }

  if (data) {
    console.log(data);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BetterTrip</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              +
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
      </IonContent>
    </IonPage>
  );
};

export default Home;
