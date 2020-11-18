import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react'
import { auth } from '../utils/nhost';
import {useHistory} from 'react-router-dom'


const Login = () => {

    let history = useHistory();
    const [emailAddress, setEmailAddress] = useState <string>("");
    const [password, setPassword] = useState <string>(""); //Bestemmer at email kun er en string

    useIonViewWillEnter(() => {
        if(auth.isAuthenticated()) {
            history.replace("/home")
        } else {
            alert("Wrong username or password")
        }

    });

const authenticateUser = async () => {
    try{
    await auth.login(emailAddress, password); //Siden det er en async funksjon må vi bruke await og catch
    history.replace('/home')
    }catch(exception) {

    }
}
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonCard>
                    <IonList>
                        <IonItem>
                            <IonInput placeholder="email" onIonInput={(event: any) => setEmailAddress(event.target.value)}></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonInput placeholder="password" type="password" onIonInput={(event: any) => setPassword(event.target.value)}></IonInput>
                        </IonItem>

                        <IonButton onClick={authenticateUser}>Login</IonButton>
                    </IonList>
                </IonCard>
            </IonContent>
        </IonPage>
    )

}

export default Login;