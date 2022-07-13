import * as React from 'react'
import styled from 'styled-components'
import Image from 'react-bootstrap/Image'
// import tanyaPortrait from '../../assets/kukaOlenImg.jpg'
import Layout from '../Layout'

const KukaOlenPage = () => {
  const Styles = styled.div`
    .container {
      margin-top: 5rem;
    }

    .floated {
      float: right;
      width: 150px;
    }

    .img {
      width: 16rem;
    }
    .paragraph {
      margin-top: 4rem;
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
`

  return (
    <Layout>
      <Styles>
        <div className="container">
          <div className="floated">
            <Image className="img" alt="image goes here" />
          </div>
          <h2>
            <span className="poppins-font">
              Kuka olen?
            </span>
          </h2>
          <span className="avenir-font">
            <p className="paragraph">
              Tiesin aina, että haluan joko terapeutiksi tai toimittajaksi. Elämä
              veikin minut ammatillisesti antoisalle, pitkälle matkalle, ja sain
              molemmat: minusta tuli ensin toimittaja ja sitten vasta terapeutti.
              Parhaillaan opiskelen työn ohella sosionomin (AMK) tutkintoa.
              Alunperin opiskelin filosofian maisteriksi Helsingin yliopistossa ja
              pääsin aikakauslehtiin töihin. Seurasi vuodet sisustus-, perhe-,
              naisten- ja terveyslehtimaailmassa. Toimittajana sytyin eniten, kun
              sain paneutua haastateltavan ajatuksiin syvällisissä
              henkilöhaastatteluissa. Päätoimittajan ja muissa esimiestehtävissä
              opin tiimityön ilosta, paineensietokyvystä ja ihmisten johtamisesta.
              Mutta olipa toimenkuva mikä tahansa, lehtityö oli enimmäkseen kovaa
              työtä, jossa piti yhdistää luovuus, tarkkuus, uteliaisuus ja hyvä
              yleissivistys. Luovina hetkinä työ olikin yhtä juhlaa. Haastavimpina
              työvaiheina tunnelmaa kevensivät hyvät työkaverit. Vieläkin ajattelen,
              miten uskomattoman hauskoja työyhteisöjä toimitukset voivat olla.
            </p>
            <p>
              Tiesin aina, että haluan joko terapeutiksi tai toimittajaksi. Elämä
              veikin minut ammatillisesti antoisalle, pitkälle matkalle, ja sain
              molemmat: minusta tuli ensin toimittaja ja sitten vasta terapeutti.
              Parhaillaan opiskelen työn ohella sosionomin (AMK) tutkintoa.
              Alunperin opiskelin filosofian maisteriksi Helsingin yliopistossa ja
              pääsin aikakauslehtiin töihin. Seurasi vuodet sisustus-, perhe-,
              naisten- ja terveyslehtimaailmassa. Toimittajana sytyin eniten, kun
              sain paneutua haastateltavan ajatuksiin syvällisissä
              henkilöhaastatteluissa. Päätoimittajan ja muissa esimiestehtävissä
              opin tiimityön ilosta, paineensietokyvystä ja ihmisten johtamisesta.
              Mutta olipa toimenkuva mikä tahansa, lehtityö oli enimmäkseen kovaa
              työtä, jossa piti yhdistää luovuus, tarkkuus, uteliaisuus ja hyvä
              yleissivistys. Luovina hetkinä työ olikin yhtä juhlaa. Haastavimpina
              työvaiheina tunnelmaa kevensivät hyvät työkaverit. Vieläkin ajattelen,
              miten uskomattoman hauskoja työyhteisöjä toimitukset voivat olla.
            </p>
          </span>
        </div>
      </Styles>
    </Layout>
  )
}

export default KukaOlenPage
