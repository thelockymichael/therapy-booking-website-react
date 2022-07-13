import * as React from 'react'
import styled from 'styled-components'
import Layout from '../Layout'

const Styles = styled.div`
  .container {
    margin-top: 5rem;
    margin-bottom: 8rem;
  }

  .header-container {
    margin-bottom: 4rem;
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
`

const LyhytterapiaPage = () => (
  <Layout>
    <Styles>
      <div className="container">
        <div className="header-container">
          <h2>
            <span className="poppins-font">
              Lyhytterapia
            </span>
          </h2>
        </div>
        <span className="avenir-font">
          <p>
            Ratkaisukeskeinen lyhytterapia on matalan kynnyksen keskusteluapua,
            joka soveltuu vaikeisiin elämäntilanteisiin ja ongelmiin kuten
            pelkoihin, ahdistukseen, masennukseen, parisuhde- ja perhekriiseihin,
            isoihin muutoskohtiin tai työelämän pulmatilanteisiin.
          </p>
          <p>
            Pääpaino on nykyisyyden ja tulevaisuuden käsittelyssä menneisyyden
            sijaan. Menneisyyttä käsitellään sen mukaan kuin tilanteessa on
            tarpeellista. Eilinen nähdään pikemminkin voimavarana, joka pyritään
            liittämään tähän hetkeen ja huomiseen.
          </p>
          <p>
            Terapia on asiakkaan ja terapeutin välistä luovaa, tasavertaista
            keskustelua. Työskentely on yksilöllistä ja asiakaslähtöistä:
            asiakkaan itse esiintuomilla ongelmilla ja muutostoiveilla on iso
            merkitys. Terapeutin tehtävä on auttaa asiakasta löytämään pieniä
            askelia ja voimavaroja, joiden avulla elämänlaatu paranee. Istunnoissa
            pyritään lisäämään toivoa, joustavuutta ja armollisuutta sekä
            suhtautumistavan muutosta, jonka tuloksena asiakkaan näkökulma
            ongelmaansa muuttuu.
          </p>
          <p>
            Yksilöterapiaistuntoihin voivat satunnaisesti osallistua myös läheiset
            ja verkostot, jos asiakas niin toivoo. Lähipiiri nähdään
            ratkaisukeskeisessä terapiassa voimavarana.
          </p>

          <p>
            Terapiassa käydään yleensä 1-10 kertaa. Joskus pari käyntiä riittää,
            keskimäärin käyntejä on 3-5:een, jotkut taas jatkavat selkeästi
            pidempään kymmenen kerran jälkeen. Jokainen käynti voidaan sopia
            erikseen edellisen käynnin lopuksi. Alussa ei sitouduta tietyn
            mittaiseen terapiajaksoon vaan terapia loppuu, kun koetaan, ettei sitä
            enää tarvita. Käynnit voivat olla esimerkiksi parin viikon välein tai
            jakautua pitkälle ajalle.
          </p>

          <p>
            Lyhytterapia ei ole psykoterapiaa, ja tarvittaessa lyhytterapeutit
            ohjaavatkin asiakkaansa varsinaiseen terveydenhuoltoon, mikäli
            lyhytterapeuttinen työote ei ole riittävä. Monet asiakkaat saavat
            kuitenkin avun jo pelkästä lyhytterapiasta. Ratkaisukeskeiseen
            lyhytterapiaan ei tarvita lähetettä. Terapia ei ole Kela-korvattavaa.
            Lyhytkestoisuutensa ansiosta se on kuitenkin todettu asiakkaalle
            kustannustehokkaaksi terapiamuodoksi.
          </p>

          <p>
            Ratkaisukeskeistä terapiaa kutsutaan myös voimavarakeskeiseksi tai
            voimavarasuuntautuneeksi terapiaksi. Sen kehittäminen alkoi
            Yhdysvalloissa 1970- ja 80-lukujen taitteessa vastapainoksi
            ongelmakeskeiselle mielenterveystyölle.
          </p>
          <p>
            Lisätietoa ratkaisukeskeisestä lyhytterapiasta saat Ratkaisu- ja
            voimavarasuuntautuneiden menetelmien edistämisyhdistys Ratkes ry:n
            sivuilta, www.ratkes.fi.
          </p>
        </span>
      </div>
    </Styles>
  </Layout>
)

export default LyhytterapiaPage
