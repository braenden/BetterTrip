import { IonAlert, IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardHeader, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useCallback, useState } from 'react'
import { useCamera, availableFeatures } from '@capacitor-community/react-hooks/camera';
import { CameraResultType } from '@capacitor/core';
import { auth, storage } from '../utils/nhost';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';


const INSERT_TRIP = gql `
mutation InsertTrip($trip: posts_insert_input!) {
    insert_posts_one(object: $trip) {
        title,
        user_id,
        description,
        image_filename
    }
}`;

const usePhotoUpload = () => {
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const uploadingPhoto = async({ base64string, filenameWithExtension } : { base64string: string, filenameWithExtension: string }) => {
        try {
            await storage.putString(`/public/${filenameWithExtension}`, base64string, "data_url", null, (pe: ProgressEvent) => { //"pe" er bare forkortelse for ProgressEvent
                setUploadProgress((pe.loaded / pe.total) * 100);
            })
        } catch (e) {
            console.warn(e)
        }

        }; // Hele funksjonen er en async funksjon som forteller hvor man skal laste opp bilder som tas, og formatet dette skal være i. Den viser også progress slik at man ser hvorvidt bildet er lastet opp eller ikke.

        return {
            uploadProgress,
            uploadingPhoto
        }
    };


const AddTrip = () => {

    const { uploadProgress, uploadingPhoto} = usePhotoUpload();
    const { photo, getPhoto} = useCamera();
    const [insertTripMutation] = useMutation(INSERT_TRIP);
    let history = useHistory();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [filename, setFilename] = useState<string>("");
    
    const openCamera = async () => {
        await getPhoto({
            resultType: CameraResultType.DataUrl, //Forteller funksjonen at vi ser etter Base64 format, som er formatet bildet lagres i
            quality: 100, //Betyr ikke noe særlig
            allowEditing: false //Bytt til true hvis det skal kunne redigeres på bildet
        });
        setFilename(`${Date.now().toString()}.jpeg`) //Ikke interessant å generere navn på denne måten i en større app, men for denne fungerer det greit. 
    }

    const uploadPhoto = async () => {
        if(photo?.dataUrl) {
            await uploadingPhoto({
                base64string: photo.dataUrl,
                filenameWithExtension: filename 
            })

        }else{
        alert("Please take a photo")
    }
}

    const insertTrip = async() => {
        try {
            await insertTripMutation({
                variables: {
                    trip: {
                        title,
                        user_id: auth.getClaim('x-hasura-user-id'), //Her henter vi innlogget brukers id for å vite hvem som laster opp bildet og hvem det tilhører
                        description,
                        image_filename: filename
                    }
                }
            })
            history.replace("/home")
        }catch (e) {

        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                        <IonButtons slot={'start'}>
                            <IonBackButton defaultHref="/home"></IonBackButton>
                        </IonButtons>
                    <IonTitle>Add new trip</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
              <IonCard>
                  <IonInput placeholder="Title" onIonInput={(event: any) => setTitle(event.target.value)}></IonInput>
                  <IonInput placeholder="Description" onIonInput={(event: any) => setDescription(event.target.value)}></IonInput>

                    <img src={photo?.dataUrl} />
                    <IonButton onClick={ openCamera }>Take photo</IonButton>
                    <IonButton onClick={ uploadPhoto }>Upload</IonButton>
                    <IonButton onClick={ insertTrip }>Add trip</IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default AddTrip;

/* defaultHref sier bare at man uansett redirectes tilbake til home */