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