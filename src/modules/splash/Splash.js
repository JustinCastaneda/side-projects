import React  from 'react'
import { Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import Headerlogo from '../common/Headerlogo'
import Styledbutton from "../styledcomponents/Styledbutton";

// Styled Components
const Centercolumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
`;

const Styledsubtext = styled.p`
  font-size: 1.3rem;
  color: #fff;
  max-width: 30rem;
  margin-top: .5rem;
  text-align: center;
`;


// Component States
// Comming soon...


// Component

export default function SplashPage() {
  return (
    <div className="wrapper fixed">
      <Grid padded>
        <Grid.Row className="header">
          <Headerlogo fontSize="3.2rem" paddingLeft>DEF3NSE</Headerlogo>
          <Grid.Column width={6}>
            <Centercolumn>
              <Headerlogo fontSize="7rem">DEF3NSE</Headerlogo>
              <Styledsubtext>Registration complete. Check your email for login instructions.</Styledsubtext>
              <a href="https://workshop.def3nse.net"><Styledbutton>Login To Def3nse</Styledbutton></a>
            </Centercolumn>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
