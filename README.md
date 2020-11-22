Dokumentasjon og notater langs veien


Prosjektet er inspirert av prosjektet fra forelesningen, og der hvor kode er direkte kopiert er det kommentert.



Appen starter med 'ionic serve'


npm install @nhost/react-apollo @nhost/react-auth nhost-js-sdk @apollo/client graphql graphql-tag
^ Lagt inn for å kunne kommunisere med databasen


Prosjektet er også testet på min iPhone, hvis du vil teste det må du ha macOS og Xcode installert. For å gjøre dette må du avigere deg til prosjektmappa TDS200_H20_10009 i din foretrukne terminal og kjøre 'npx cap open ios'

Da vil den åpne i Xcode. Videre må du sørge for at appen er innstilt i prosjektet til å signere via ditt eget team.

Andre krav til kjøring:

* Må ha CocoaPods installert, kan enkelt installeres via HomeBrew
* Bruk helst ekstern terminal til å åpne prosjektet i Xcode



Rules i Nhost:

functions:  isAuthenticated: "return !!request.auth"  isOwner: "return !!request.auth && userId === request.auth['user-id']"paths:  /public*:    read: "true"    write: "isAuthenticated()"


##Språkvalg
Jeg har valgt å bruke engelsk over hele appen for å holde det ryddig, men ved eventuell videreutvikling av appen skal den være på norsk i tillegg.


Styling er gjort gjennom styled components.


##TODO:

- Legge til funksjonalitet slik at man kan fortsette som gjest uten å logge inn, og dermed kan se alle postene, men 
ikke interagere med dem. Kan heller ikke legge til nye poster.

- Kan eventuelt ha all funksjonalitet tilgjengelig for 'new trip' og kommentering osv, og da alerte brukeren med at han må logge inn eller opprette en bruker for å ha tilgang til å gjøre dette.

- Slette poster og kommentarer, evt sin egen bruker


##Nyttige sider benyttet i oppgaven: 

- https://ionicframework.com/docs/ (Hvordan bruke Ionic bascially)
- https://coolors.co/ (For farger)
- https://unsplash.com/ (Free-to-use bilder)
- https://github.com/capacitor-community/react-hooks (For bruk av kamera i appen)

Har også selvfølgelig sett gjennom og fulgt alle forelesninger i TDS200 ved foreleser Andreas Bjørn-Hansen.


Punkt 8 i kravene: 

Løsningen jeg har utviklet ser ikke spesielt super ut i web på maskiner, da jeg har siktet på at denne appen skal bli brukt hovedsakelig og kanskje nesten utelukkende på mobile enheter. Der ser den veldig bra ut. Ved testing av løsningen må du gjerne deploye den til en mobil eller ha mobile-view i nettleseren din.

Enkle forbedringer som tiden avslo: 
- Feil animasjon når man går fra 'home' til 'addtrip'
- Enkel implementasjon av tilbake-knapp i 'addtrip'