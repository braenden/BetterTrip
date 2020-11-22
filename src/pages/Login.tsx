import { IonButton, IonCard, IonSpinner, IonContent, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, IonToast } from '@ionic/react';
import React, { useState } from 'react';
import { auth } from '../utils/nhost';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { logInOutline } from 'ionicons/icons';
import { accessibilityOutline } from 'ionicons/icons';



const Login = () => {

    let history = useHistory();
    const [emailAddress, setEmailAddress] = useState <string>("");
    const [password, setPassword] = useState <string>(""); //Bestemmer at email kun er en string
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false); //Til funksjonen som bestemmer om loginknappen skal vise en animasjon eller ikke
    const [showToast, setShowToast] = useState<boolean>(false);

    useIonViewWillEnter(() => {
        if(auth.isAuthenticated()) {
            history.replace("/home")
        }

    });

const authenticateUser = async () => {
    setIsAuthenticating(true);
    try{
    await auth.login(emailAddress, password); //Siden det er en async funksjon må vi bruke await og catch
    setIsAuthenticating(false);
    
    history.replace('/home')

    }catch(exception) {
        console.error(exception)
        setIsAuthenticating(false); //Bestemmer at ikke dottene skal fortsette å spinne hvis brukeren ikke blir logget inn
        setShowToast(true);
    }
}
    return (
        <IonPage>
            <IonContent1>
                <Container>
                    <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message="Wrong email or password"
                        duration={2500}
                        color="light" />

                    <BigTripLogo icon={ accessibilityOutline } />
                    <PageTitle>BetterTrip</PageTitle>
                <IonCard>
                    <IonList>
                        <IonItem>
                            <IonInput placeholder="email" onIonInput={(event: any) => setEmailAddress(event.target.value)}></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonInput placeholder="password" type="password" onIonInput={(event: any) => setPassword(event.target.value)}></IonInput>
                        </IonItem>
                    </IonList>
                </IonCard>
                    <LoginButton onClick={authenticateUser}> {
                        
                            isAuthenticating ?
                                <IonSpinner name="dots" />
                            :
                                <IonIcon icon={ logInOutline } />
                                
                                // Har brukt ? og : som vist i forelesningen, annen måte å skrive 'if else' på
                        }
                    </LoginButton>
                </Container>
            </IonContent1>
        </IonPage>
    )

}

//Styling -------

const BigTripLogo = styled(IonIcon) `
font-size: 100px;
align-self: center;
--background: #01161E;
`;

const LoginButton = styled(IonButton) `
align-self: center;
--background: #01161E;
`;



const IonContent1 = styled(IonContent) `
--background: #86BAA1
`;

const Container = styled.div `
display: flex;
justify-content: center;
height: 90%;
flex-direction: column;
`;

const PageTitle = styled.h2 `
font-size: 4em;
align-self: center;
color: #01161E;
font-family: 'Chewy', cursive;
margin-bottom: 5%;
`;

export default Login;