import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonPage, IonHeader, IonToolbar, IonTitle, IonImg } from '@ionic/react';
import React from 'react'
import ITrip from '../models/ITrip';
import { useState } from 'react';

const TripCard = ({description, title, user, image_filename}: ITrip) => {
    //Forteller at TripCard skal arve parametere fra ITrip



    /* const [gotPhoto, setGotPhoto] = useState<boolean>(false);
    
    const successGettingPhoto = () => {
      if (image_filename = "") {
        <img src="/assets/example3.jpeg" />
      } else {
        <img src={`https://backend-xgqvvidg.nhost.app/storage/o/public/${image_filename}`} />   
      }
    };


  const successGettingPhoto = async () => {
    setGotPhoto(true);
    try{
      <img src={`https://backend-xgqvvidg.nhost.app/storage/o/public/${image_filename}`} />
      setGotPhoto(false);

    }catch(exception) {
        console.error(exception)
        setGotPhoto(false);
        <img src="/assets/example3.jpeg" />
    }
} 

Grunnet at jeg ikke får tilgang til storage i nhost har jeg prøvd meg på en alternativ løsning med 'if' 'else'.
Jeg ville at hvis ikke appen klarte å hente bildene fra storage (som den tydeligvis ikke klarer) så vises et eksempelbilde example3.jpeg.
Jeg fikk dessverre ikke dette til men lot det stå kommentert ut slik at du kan se hva jeg har tenkt. Nå må jeg bare vise eksempelbildet mitt uansett.

*/







    return (
        <IonCard> 
          <img src="/assets/example3.jpeg" />
        <IonCardHeader>
          <IonCardSubtitle>
            {user.display_name} &bull; ? likes
          </IonCardSubtitle>
          <IonCardTitle>
                {title}
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
              {description}
        </IonCardContent>
      </IonCard>
    )
}

export default TripCard;