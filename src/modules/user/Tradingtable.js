import React, { Component } from 'react'
import { Table, Accordion, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

import Factionstable from './Factionstable'

// Styled components
const Styledtable = styled(Table)`
  &&& {
    background: transparent;
    text-align: center;
    margin: 0;
    padding: .5rem 0 0 0;
    border-top: 1px solid #333;
    border-radius: 0;
    &:first-child {
      border: none;
    }
    thead th {
      background: transparent;
      font-size: .75rem;
      text-transform: uppercase;
      color: #ccc !important;
    }
    td {
      font-weight: 700;
    }
  }
`;

const Styledaccordion = styled(Accordion)`
  /* &&& for specificity override */
  &&& {
    i.dropdown.icon {
      display: none;
    }
    .title, .content {
      padding: 0 !important;
    }
    .title.active {
      background-color: rgba(37,37,37,.75);
      .ui.table {
        border-top: 2px solid #2185D0;
      }
      td:first-child {
        text-shadow: 0 0 10px #2185D0;
      }
    }
    .content.active {

        border-bottom: 2px solid #2185D0;

    }
  }
`;

// Mock Data
const MockData = [
  {
    id: 1,
    name: 'Tactic 1',
    trading: true,
    probability: '88%',
    trend: '+2',
    mytrade: '200'
  },
  {
    id: 2,
    name: 'Tactic 2',
    trading: false,
    probability: '15%',
    trend: '+2',
    mytrade: '250'
  },
  {
    id: 3,
    name: 'Tactic 3',
    trading: false,
    probability: '18%',
    trend: '+2',
    mytrade: '400'
  },
  {
    id: 4,
    name: 'Tactic 4',
    trading: true,
    probability: '12%',
    trend: '+3',
    mytrade: '200'
  },
  {
    id: 5,
    name: 'Tactic 5',
    trading: false,
    probability: '25%',
    trend: '+5',
    mytrade: '0'
  },
  {
    id: 6,
    name: 'Tactic 6',
    trading: false,
    probability: '33%',
    trend: '+10',
    mytrade: '0'
  },
  {
    id: 7,
    name: 'Tactic 7',
    trading: true,
    probability: '88%',
    trend: '+2',
    mytrade: '200'
  },
  {
    id: 8,
    name: 'Tactic 8',
    trading: false,
    probability: '15%',
    trend: '+2',
    mytrade: '250'
  },
  {
    id: 9,
    name: 'Tactic 9',
    trading: false,
    probability: '18%',
    trend: '+2',
    mytrade: '400'
  },
  {
    id: 10,
    name: 'Tactic 10',
    trading: true,
    probability: '12%',
    trend: '+3',
    mytrade: '200'
  },
  {
    id: 11,
    name: 'Tactic 11',
    trading: false,
    probability: '25%',
    trend: '+5',
    mytrade: '0'
  },
  {
    id: 12,
    name: 'Tactic 12',
    trading: false,
    probability: '33%',
    trend: '+10',
    mytrade: '0'
  }
];

const TacticTabTitle = ({ id, name, trading, probability, trend, mytrade }) => (
  <Styledtable inverted>
    <Table.Body>
      <Table.Row id={id}>
        <Table.Cell width={4}>{name}</Table.Cell>
        <Table.Cell width={3}>
          <Icon name={trading ? 'checkmark' : 'remove'} color={ trading ? 'green' : 'red'}/>
        </Table.Cell>
        <Table.Cell width={3}>{probability}</Table.Cell>
        <Table.Cell width={3}>{trend}</Table.Cell>
        <Table.Cell width={3}>{mytrade}</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Styledtable>
);

const rootPanels = MockData.map(tactic => ({
  title: {
    content: <TacticTabTitle name={tactic.name} trading={tactic.trading} probability={tactic.probability} trend={tactic.trend} mytrade={tactic.mytrade} />,
    key: `tactic-tab-${tactic.id}`
   },
   content: {
     content: <Factionstable />,
     key: `tactic-tab-${tactic.id}`
   }
}));

/*
To Do:
- Need to connect all of this up to the data and add any regions I missed in TacticTabTitle and the MockData.
- Tactics will come from the Artifacts in each round, so I'm not sure how we'll deal with the data for that. I'm thinking each Artifact will come with the tactic data, or make a call to pull in certain tactic information into TacticTabTitle.
*/
class Tradingtable extends Component {
  state = { activeIndex: 0 }

  handleTitleClick = (e, itemProps) => {
    const { index } = itemProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({activeIndex: newIndex})
  }

  render() {
    const { activeIndex } = this.state

    return (
      <div>
        <Styledtable inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={4}>Tactics</Table.HeaderCell>
              <Table.HeaderCell width={3}>Trading</Table.HeaderCell>
              <Table.HeaderCell width={3}>Probability %</Table.HeaderCell>
              <Table.HeaderCell width={3}>Trend</Table.HeaderCell>
              <Table.HeaderCell width={3}>My Trade</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Styledtable>
        <Styledaccordion fluid inverted activeIndex={activeIndex} panels={rootPanels} onTitleClick={this.handleTitleClick}/>
      </div>
    );
  }
}

export default Tradingtable;
