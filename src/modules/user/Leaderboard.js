import React, { Component } from 'react'
import styled from 'styled-components'

import Styledbutton from '../styledcomponents/Styledbutton'
import Commonmodal from '../common/Commonmodal'
import Tabcontent from './Tabcontent'

// Styled components
const Styledwrap = styled.div`
  &&& {
    button {
      margin: .9rem auto;
      font-size: .8rem;
      padding: .75rem 1.25rem;
    }
    div:last-child {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 4rem;
      background: linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.9));
      border-top: 1px solid #333;
    }
  }
`;

const Styledheader = styled.div`
  display: flex;
  color: #7d7d7d;
  padding: .75rem 0;
  font-size: 1rem;
  aside {
    width: 19%;
    text-align: center;
  }
  section {
    width: 61%;
  }
`;

const Styledlistwrap = styled.ul`
  padding: 0 0 .25rem 0;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 14rem;
`;

const Styledleader = styled.li`
  color: #fff;
  display: flex;
  padding-bottom: .25rem;
  font-size: 1rem;
  aside {
    width: 20%;
    text-align: center;
  }
  section {
    width: 60%;
  }
  @media (min-width: 1920px) {
    padding-bottom: .5rem;
  }
`;



const mockData = [
  {
    rank: 1,
    id: 'joe',
    name: 'Joe Swanson',
    score: 30
  },
  {
    rank: 2,
    id: 'tim',
    name: 'Tim Blake',
    score: 28
  },
  {
    rank: 3,
    id: 'jane',
    name: 'Jane MacLaughlin',
    score: 26
  },
  {
    rank: 4,
    id: 'anna',
    name: 'Anna Fleming',
    score: 20
  },
  {
    rank: 5,
    id: 'joe',
    name: 'Joe Swanson',
    score: 30
  },
  {
    rank: 6,
    id: 'tim',
    name: 'Tim Blake',
    score: 28
  },
  {
    rank: 7,
    id: 'Diana',
    name: 'Diana MacLaughlin',
    score: 26
  },
  {
    rank: 8,
    id: 'billy',
    name: 'Billy Fleming',
    score: 20
  },
  {
    rank: 9,
    id: 'robert',
    name: 'Robert MacLaughlin',
    score: 26
  },
  {
    rank: 10,
    id: 'donald',
    name: 'Donald Trump',
    score: 20
  }
]

const Leaderheading = () => (
  <Styledheader>
    <aside>Rank</aside>
    <section>Name</section>
    <aside>Score</aside>
  </Styledheader>
)

function LeadersList(props) {
  const players = props.leadersData;
  const listItems = players.map((player) =>
    <Styledleader key={player.id}>
      <aside>{player.rank}</aside>
      <section>{player.name}</section>
      <aside>{player.score}</aside>
    </Styledleader>
  );
  return (
    <Styledlistwrap>{listItems}</Styledlistwrap>
  );
}

const Leadermodalbutton = () => (
  <Styledbutton>View All</Styledbutton>
);

/*
To Do:
- API calls for leaderboard data to replace mockData
*/

class Leaderboard extends Component {
  render() {
    return (
      <Styledwrap>
        <Leaderheading />
        <LeadersList leadersData={mockData} />
        <Commonmodal modalSize="small" triggerButton={ Leadermodalbutton() } modalHeader="Leaderboard" modalContent={ Tabcontent() } buttonText="Close"/>
      </Styledwrap>
    );
  }
}

export default Leaderboard;
