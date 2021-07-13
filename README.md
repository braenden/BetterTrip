Prosjektet er inspirert av prosjektet fra forelesningene.

Brukere:

Brukernavn: epost@epost.no
Passord: passord1234

Brukernavn: okay@okay.no
Passord: okay

Brukernavn: test@test.no
Passord: test

Brukernavn: epost1@epost.no
Passord: passord1234


Appen starter med 'ionic serve'


Det er en stor feil et eller annet sted som jeg ikke klarer å jakte ned, og det er at jeg får ikke tilgang til 'storage' i Nhost.
Jeg får ikke hentet data derfra, og jeg får ikke lastet opp dit. Har forsøkt ved å manuelt opprette en public mappe, og prøve å la den autogenere seg selv. Det går dessverre ikke, og jeg blir konstant møtt med 404 response fra serveren.


Prosjektet er testet på min egen iPhone, som fungerte supert. Hvis du vil teste det må du ha macOS og Xcode installert. For å gjøre dette navigerer du deg til prosjektmappa TDS200_H20_10009 i din foretrukne terminal og kjører 'capacitor add ios' etterfulgt av 'capacitor add ios'.

Da vil den åpne i Xcode. Videre må du sørge for at appen er innstilt i prosjektet til å signere via ditt eget team.

Andre krav til kjøring:

* Må ha CocoaPods installert, kan enkelt installeres via HomeBrew
* Bruk helst ekstern terminal til å åpne prosjektet i Xcode



Rules i Nhost:

functions:  isAuthenticated: "return !!request.auth"  isOwner: "return !!request.auth && userId === request.auth['user-id']"paths:  /public*:    read: "true"    write: "isAuthenticated()"


##Språkvalg
Jeg har valgt å bruke engelsk over hele appen for å holde det ryddig, men ved eventuell videreutvikling av appen skal den være på norsk i tillegg.


Styling er gjort gjennom styled components.


##Nyttige sider benyttet i oppgaven: 

- https://ionicframework.com/docs/ (Hvordan bruke Ionic bascially)
- https://coolors.co/ (For farger)
- https://unsplash.com/ (Free-to-use bilder)
- https://github.com/capacitor-community/react-hooks (For bruk av kamera i appen)
- https://ionicframework.com/docs/react/your-first-app/2-taking-photos (Videre dokumentasjon på kamera i appen)

Har også selvfølgelig sett gjennom og fulgt alle forelesninger i TDS200 ved foreleser Andreas Bjørn-Hansen.


Punkt 8 i kravene: 

Løsningen jeg har utviklet ser ikke spesielt super ut i web på maskiner, da jeg har siktet på at denne appen skal bli brukt hovedsakelig og kanskje nesten utelukkende på mobile enheter. Der ser den veldig bra ut. Ved testing av løsningen må du gjerne deploye den til en mobil eller ha mobile-view i nettleseren din.


I den teoretiske delen (oppgave 1) har jeg valgt å gjøre oppgaven så reell som mulig, og hadde i tankene under produksjon at jeg skulle presentere min kompetanse og mine tanker til hele bedriften.


Kjente feil:

- Ikke mulig å laste opp bilder, ikke klart å finne feilen.



Permissions av kommentarer:

- Eier av innlegget kan slette alle kommentarer som er lagt inn på posten.

- Grunnet begrensinger i Hasura kan ikke bruker slette eller endre sin egen kommentar.

- Brukere kan også endre sine egne kommentarer gitt at user_id matcher innlogget user_id.



Permissions av poster/turer

- Brukere kan slette signe egne poster, men ikke andres. Dette sjekkes ved å verifisere at Hasura-user-id matcher posten sin user_id.


Kjent bug: Når man signer opp og automatisk blir tatt inn i homefeeden, er den tom. Tror det er noe feil med permissions i Hasura.
