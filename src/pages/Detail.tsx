import { IonBackButton, IonButtons, IonCard, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react"
import TripCard from "../components/TripCard";
import ITrip from "../models/ITrip";
import gql from 'graphql-tag';
import { useQuery } from "@apollo/client";
import ICommentList from "../models/ICommentList";

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

const Detail = (props: any) => {

    //Henter data fra props
    const post: ITrip = props.location?.state?.post //Tilsvarer state.post i Home.tsx
    //Bruker spørsmålstegn etter location og state for å slippe at ingenting rendrer når man går tilbake til home

    const { loading, data } = useQuery<ICommentList>(GET_COMMENTS, { //Her henter vi kommentarene ved hjelp av gitt query
        variables: {
          post_id: post?.id
        },
        fetchPolicy: "no-cache"
    });

    if (!post) {
        return <div></div>
    }

if (loading) {
    return <IonLabel>Loading</IonLabel>
  }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Detail View</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
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
            </IonContent>
        </IonPage>
        

        
    )
};

export default Detail;