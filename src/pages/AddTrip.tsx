import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardHeader, IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useCallback } from 'react'
import { useCamera, availableFeatures } from '@capacitor-community/react-hooks/camera';
import { CameraResultType } from '@capacitor/core';
import { storage } from '../utils/nhost';
import ITrip from '../models/ITrip';
import { useHistory } from 'react-router-dom';

const AddTrip = () => {

    const { getPhoto, photo} = useCamera();
    let history = useHistory();

    const openCamera = async () => {
        await getPhoto({
            resultType: CameraResultType.DataUrl, //Forteller funksjonen at vi ser etter Base64 format, som er formatet bildet lagres i
            quality: 100, //Betyr ikke noe særlig
            allowEditing: false //Bytt til true hvis det skal kunne redigeres på bildet
        })
    }

    const uploadPhoto = async () => { //Denne funksjonen forteller appen hvor bildet vi tar skal lastes opp
        await storage.putString('/public/example.jpeg', (photo?.dataUrl as string), "data_url", null, (pe: ProgressEvent) => { //"pe" betyr ProgressEvent
            console.log(pe.loaded)
        });
    }

    const goBackSimplified = () => {
        history.replace('/home') //Jeg vet dette er bad practice men jeg nedprioriterte å sette av tid til det
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={ goBackSimplified }>Back</IonButton>
                        </IonButtons>
                    <IonTitle>Add new trip</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
              <IonCard>
                    <img alt="" src={photo?.dataUrl} /> { /*Henter ut bildet vi tar med kamera*/ }
                    <IonButton onClick={ openCamera }>Take photo</IonButton>
                    <IonButton onClick={ uploadPhoto }>Upload</IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default AddTrip;