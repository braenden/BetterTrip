import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'

const Login = () => {
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
                            <IonInput placeholder="username"></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonInput placeholder="password" type="password"></IonInput>
                        </IonItem>

                        <IonButton>Login</IonButton>
                    </IonList>
                </IonCard>
            </IonContent>
        </IonPage>
    )

}

export default Login;