import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

import Styledbutton from '../styledcomponents/Styledbutton'
import Commonmodal from '../common/Commonmodal'
import Tabcontent from './Tabcontent'

//Styled components
const Styledwrap = styled.div`
  /* &&& for specificity override */
  &&& {
    button {
      margin: .9rem auto;
      font-size: .8rem;
      padding: .75rem 1.25rem;
    }
    &>div:last-child {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 4rem;
      background: linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.9));
      border-top: 1px solid #333;
      border-radius: 0 0 8px 8px;
    }
  }
`;

const Styledlistwrap = styled.ul`
  padding: 0 0 .25rem 0;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 1rem;
`;

const Styledgamelog = styled.li`
  color: #fff;
  display: flex;
  padding-bottom: .8rem;
  font-size: .9rem;
  aside {
    flex: 10%;
    text-align: left;
  }
  section {
    flex: 90%;
  }
  @media (min-width: 1920px) {
    padding-bottom: .5rem;
  }
`;

const Styledlink = styled.a`
  display: flex;
  width: 100%;
  justify-content: start;
`;

const Styledmessage = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
`;


// Mock Data
const mockData = [
  {
    id: 1,
    type: 'Join',
    text: 'You Joined the Game!',
    link: null
  },
  {
    id: 2,
    type: 'Message',
    text: 'NEW MESSAGE',
    link: '/messages'
  },
  {
    id: 3,
    type: 'Trade',
    text: 'Jimbo25 just traded 25cc for Tactic1',
    link: null
  }
];


// Line item template
function Gameloglist(props) {
  const messages = props.messageData;
  const listItems = messages.map((message) =>
    <Styledgamelog key={message.id}>
      {message.link ?
         <Styledlink href={message.link}><aside><Icon name="comments"/></aside><section>{message.text}</section></Styledlink> :
         <Styledmessage><Icon name="shield"/><section>{message.text}</section></Styledmessage>
      }

    </Styledgamelog>
  );
  return (
    <Styledlistwrap>{listItems}</Styledlistwrap>
  );
}

const Gamelogmodalbutton = () => (
  <Styledbutton>View All</Styledbutton>
);

/*
To Do:
- Build code to replace Mock Data
- Build Game log modal info
 */

class Gamelog extends Component {
  render() {
    return (
      <Styledwrap>
        <Gameloglist messageData={mockData} />
        <Commonmodal modalSize="small" triggerButton={ Gamelogmodalbutton() } modalHeader="Gamelog" modalContent={ Tabcontent() } buttonText="Close"/>
      </Styledwrap>
    );
  }
}

export default Gamelog;
