import { useQuery } from '@apollo/client';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonSlide, IonTitle, IonToolbar } from '@ionic/react';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import IPost from '../models/IPost';
import IPostList from '../models/IPostList';
import './Home.css';

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

  const {loading, data} = useQuery<IPostList>(GET_POSTS) //Her henter vi ut struktur fra IPostList interfacet

  if (loading) {
    return <IonLabel>Loading</IonLabel> //Sier enkelt og greit at det skal displaye en melding om vi fortsatt venter på data.
  }

  if (data) {
    console.log(data);
  }

  /*
  const [posts, setPosts] = useState<IPost[]>( //Henter ut posts og gjør det mulig å legge til nye.
                                               // Vi har nå valgt å hente fra et array i interfacet.
    [
      {
        id: 1,
        title: "Fin tur på fjellet",
        description: "Hardangervidda var flott!",
        username: "Kari",
        likes: 25
      },
      {
        id: 2,
        title: "Veldig mye vind!",
        description: "Hardangervidda var ikke like flott i dag!",
        username: "Ola",
        likes: 2
      }
    ]
  );
  */

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
              <PostCard {...post} />
            </Link> //Bruker spread syntax for å ikke repetere alle parameterne {...post}
                    //Pakker ut parameterne utenfor objektet.
          ))
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
