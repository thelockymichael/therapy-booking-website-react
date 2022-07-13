import * as React from 'react'

import styled from 'styled-components'
import Layout from '../Layout'
import colors from '../../colors'

const AsiakasrekisteriPage = () => {
  const Styles = styled.div`
    .container {
      margin-top: 4rem;
      margin-bottom: 8rem;
    }

    .paragraph {
      margin-top: 1.5rem;
    }

    /* Font styling */
    .poppins-font {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
    }

    .avenir-font {
      font-family: 'Avenir', sans-serif;
      font-weight: 400;
      font-size: 17px;
    }
    /*  END  */

    .booking-btn {
      border-radius: 2rem;
      border: solid black;
      background-color: ${colors.champagnePink};
      :hover {
        background-color: ${colors.antiqueBrass};
        border: solid black;
      }
    }

    .booking-btn .nav-link {
      color: black;
      :hover {
        color: white;
      }
    }

    .bottom-container {
      display: flex;
      flex-direction: row;
    }
  `

  return (
    <Layout>
      <Styles>
        <div className="container">
          <h2>
            <span className="poppins-font">
              Asiakasrekisteri- ja tietosuojaseloste
            </span>
          </h2>
          <span className="avenir-font">
            <p className="paragraph">
              <b>1. Rekisterinpitäjä</b>
              <br />
              Ratkaisukeskeinen lyhytterapeutti  
              <br />
              puhelin: (e.g. phone num 341541251) (phone num goes here)
              <br />
              sähköposti: (email goes here)
            </p>
            <p className="paragraph">
              <b>2. Asiakas- ja henkilötietojen käsittelyn tarkoitus</b>
              <br />
              Kaikki terapiassa käydyt keskustelut ovat luottamuksellisia.
              Tämä koskee myös terapeutin tekemiä manuaalisia muistiinpanoja,
              jotka säilytetään lukitussa tilassa. Muistiinpanoja ei tallenneta sähköisesti.
              Kirjalliset muistiinpanot hävitetään terapiasuhteen päättyessä.
              Terapiasuhde katsotaan päättyneeksi, kun asiakkaan viimeisimmästä käynnistä
              on kulunut 12 kuukautta.
            </p>
            <p className="paragraph">
              Terapeutin asiakasrekisteri on manuaalinen taulukko,
              josta käyvät ilmi asiakkaan nimi,
              sähköpostisoite, kotiosoite ja kotipaikkakunta.
              Myöskään näitä tietoja terapeutti ei kirjaa sähköisesti. Asiakkaan
              kanssa käytyjä keskusteluja ei nauhoitetta.
            </p>
            <p className="paragraph">
              Lyhytterapiasuhde ei ole potilas- vaan asiakassuhde,
              jota säätelee kuluttajansuojalaki.
            </p>
            <p className="paragraph">
              Laskutusta varten asiakas ilmoittaa nimensä, sähköpostiosoitteensa,
              kotiosoitteensa ja -paikkakuntansa. Nämä tiedot säilytetään
              UKKO.fi-laskutuspalvelussa. Palveluntarjoaja on sitoutunut
              EU:n 1.1.2019 voimaan tulleen tietosuoja-asetuksen noudattamiseen.
            </p>
            <p className="paragraph">
              Rekisteriin tallennetaan tarvittaessa myös asiakkaan ilmoittaman
              lähiomaisen tai muun yhteyshenkilön nimi ja yhteystiedot.
            </p>
            <p className="paragraph">
              Ajan varaamalla ja palvelua käyttämällä asiakas suostuu
              henkilötietojen käsittelyyn tämän selosteen
              mukaisesti. Lyhytterapiassa ei käytetä asiakkaan henkilötunnusta.
            </p>
            <p className="paragraph">
              <b>3. Henkilötietojen käsittelyn oikeusperuste</b>
              <br />
              Lakisääteinen velvoite:
              <ul>
                <li>EU:n yleinen tietosuoja-asetus (2016/679)</li>
                <li>Tietosuojalaki (5.12.2018/1050)</li>
              </ul>
              Tämä koskee myös terapeutin tekemiä manuaalisia muistiinpanoja,
              jotka säilytetään lukitussa tilassa. Muistiinpanoja ei tallenneta sähköisesti.
              Kirjalliset muistiinpanot hävitetään terapiasuhteen päättyessä.
              Terapiasuhde katsotaan päättyneeksi, kun asiakkaan viimeisimmästä käynnistä
              on kulunut 12 kuukautta.
            </p>
            <p className="paragraph">
              <b>4. Käsittelyssä käytettävät tietojärjestelmät</b>
              <br />
              Lakisääteinen velvoite:
              <ul>
                <li>UKKO.fi:n laskutusrekisterijärjestelmä</li>
              </ul>
              Tämä koskee myös terapeutin tekemiä manuaalisia muistiinpanoja,
              jotka säilytetään lukitussa tilassa. Muistiinpanoja ei tallenneta sähköisesti.
              Kirjalliset muistiinpanot hävitetään terapiasuhteen päättyessä.
              Terapiasuhde katsotaan päättyneeksi, kun asiakkaan viimeisimmästä käynnistä
              on kulunut 12 kuukautta.
            </p>
            <p className="paragraph">
              <b>5. Mistä käsittelyssä tarvittavat henkilötiedot saadaan</b>
              <br />
              Tietolähteenä toimii palvelua käyttävä asiakas itse.
              Asiakas voi itse luovuttaa omia tietojaan tai antaa
              suostumuksensa tietojen hankintaan esimerkiksi lähiomaiselta.
              Terapeutti sitoutuu pitämään asiakkaalta kuulemansa asiat
              luottamuksellisina. Vaitiolovelvollisuus jatkuu myös
              terapiaprosessin loputtua. Asiakkaan tilannetta ja
              terapiaprosessin etenemistä voidaan asiakkaan luvalla
              käsitellä terapeutin omassa työnohjauksessa niin, ettei asiakas ole tunnistettavissa.
            </p>
            <p className="paragraph">
              <b>6. Henkilötietojen luovuttaminen</b>
              <br />
              Palvelun asiakkaita koskevat henkilötiedot ovat salassa
              pidettäviä, eikä niitä luovuteta kolmansille osapuolille
              ilman asiakkaan erillistä suostumusta.
            </p>
            <p className="paragraph">
              <b>7. Rekisteröidyn oikeudet</b>
              <br />
              Palvelun käytön yhteydessä asiakasrekisteriin rekisteröidyllä on
              oikeus tarkastaa itseään koskevat tiedot. Tarkastuspyynnöt tulee
              toimittaa kirjallisesti rekisterinpitäjälle. EU:n yleisen
              tietosuoja-asetuksen ja tietosuojalain mukaan rekisterinpitäjän
              velvollisuus on oma-aloitteisesti sekä myös rekisteröidyn
              pyynnöstä korjata henkilörekisteriin sisältyvät virheelliset tiedot.
              Rekisteröidyllä on oikeus vaatia tietojensa poistamista
              asiakasrekisteristä, mikä tarkoittaa palvelun käytön lopettamista.
            </p>
          </span>
        </div>
      </Styles>
    </Layout>
  )
}

export default AsiakasrekisteriPage
