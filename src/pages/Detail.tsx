import { IonBackButton, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react"
import TripCard from "../components/TripCard";
import ITrip from "../models/ITrip";
import gql from 'graphql-tag';
import { useMutation, useQuery } from "@apollo/client";
import ICommentList from "../models/ICommentList";
import styled from 'styled-components';
import { auth } from "../utils/nhost";
import { useHistory } from 'react-router-dom';

const GET_COMMENTS = gql`
  query getCommentsByPostID($post_id: Int!) {
    posts_by_pk(id: $post_id) {
      comments {
        text
        user {
          display_name
        }
      }
    }
  } 
`;

//Mutation brukes for oppdatere ting, slette eller legge til nye ting i et element
const DELETE_POST = gql`
  mutation DeleteTrip($post_id: Int!) {
    delete_comments (
      where: {
        post_id: {
          _eq: $post_id
        }
      }
    ) 
      {
      affected_rows
    }
    delete_posts_by_pk (
      id: $post_id
    ) 
      {
      id
    }
  }
`;

const Detail = (props: any) => {

    //Henter data fra props
    const post: ITrip = props.location?.state?.post //Tilsvarer state.post i Home.tsx
    //Bruker spørsmålstegn etter location og state for å slippe at ingenting rendrer når man går tilbake til home

    const [deleteTripMutation] = useMutation(DELETE_POST)
    let history = useHistory();

    const { loading, data } = useQuery<ICommentList>(GET_COMMENTS, { //Her henter vi kommentarene ved hjelp av gitt query
        variables: {
          post_id: post?.id
        },
        fetchPolicy: "no-cache"
    });

    if (!post) { //Hvis det ikke er noen turer returnerer vi en tom div for å slippe feilmelding bascially. Quick fix..
        return <div></div>
    }

if (loading) {
    return <IonLabel>Loading</IonLabel>
  }

  const deleteTrip = async () => {
    try {
      await deleteTripMutation({
        variables: {
          post_id: post.id
        }
      })
      history.replace("/home") //Ikke optimalt å kun redirekte brukeren til home siden da home ikke automatisk refreshes, men bedre enn at ingenting skjer
    }catch (e) {
      console.warn(e)
    }
  }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>More info</IonTitle>
                    {
                     post.user.id === auth.getClaim('x-hasura-user-id') && /* Her sjekker vi at innlogget brukers id matcher posten vi prøver å slette
                                                                              Vi har allerede satt permissions for brukere slik at de kan slette alle kommentarer
                                                                              tilhørende sin egen post, så dette er ikke nødvendig å kjøre en spørring på. */
                     <IonButtons slot="end">
                      <IonButton color="danger" onClick={deleteTrip}>Delete post</IonButton>
                    </IonButtons>
                    }
                </IonToolbar>
            </IonHeader>
            <IonContentDetail>
                <TripCard {...post} />
                <IonCard>
                    <IonList>
                        {
                        data?.posts_by_pk.comments?.map((comment, i) => (
                            <IonItem key={i}>
                            <IonLabel>
                                <h2>{comment.user.display_name}</h2>
                                <p>{comment.text}</p>
                            </IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                </IonCard>
            </IonContentDetail>
        </IonPage>     
    )
};

const IonContentDetail = styled(IonContent) `
--background: #AEC3B0
`;

export default Detail;