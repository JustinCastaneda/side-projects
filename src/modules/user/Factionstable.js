import React, { Component } from 'react'
import { Table, Form, Checkbox, Input } from 'semantic-ui-react'
import styled from 'styled-components'

import Styledbutton from '../styledcomponents/Styledbutton'

// Styled components
const Styledtable = styled(Table)`
  /* &&& for specificity override */
  &&& {
    margin: 0;
    background: transparent;
    position: relative;
    z-index: 2;
    th {
      background: transparent;
      text-transform: uppercase;
      font-size: .75rem;
      color: #7d7d7d;
      &.two, &.four {
        text-align: center;
      }
    }
    td {
      background: transparent;
      padding: .25rem 1rem;
      &.two, &.four {
        text-align: center;
      }
    }
    input {
      background: #333;
      color: #fff;
    }
  }
`;
const Factionwrap = styled.div`
  padding: 1rem;
  border: none;
  background: rgba(37,37,37,.75);
  position: relative;
  button {
    margin: 1rem auto 0 !important;
  }
`;
const Styledinfo = styled.div`
  font-size: .9rem;
  padding: .5rem;
`;

// MockData
const MockData = [
  {
    id: 0,
    type: 'selectAll',
    faction: 'China',
    predict: false
  },
  {
    id: 1,
    type: 'selectAll',
    faction: 'Russia',
    predict: false
  },
  {
    id: 2,
    type: 'selectAll',
    faction: 'Private Hacker',
    predict: false
  },
  {
    id: 3,
    type: 'selectAll',
    faction: 'Iran',
    predict: false
  }
];

//To Do:
// Figure out multiple choice & Select all
// Disable Input if checkmark isn't checked

function FactionRows(props) {
  const factions = props.factionsData;
  const listItems = factions.map((faction) =>
    <Table.Row>
      <Table.Cell width={2}>
        <Checkbox inverted/>
      </Table.Cell>
      <Table.Cell width={10}>{faction.faction}</Table.Cell>
      <Table.Cell width={4}><Form.Field inverted control={Input} type="number" min="0" max="100" placeholder="00"/></Table.Cell>
    </Table.Row>
  );
  return (
    <Styledtable celled inverted>{listItems}</Styledtable>
  );
}

//To Do:
// Hook up button to submissions for FactionRow Inputs. Wasn't sure how to go about this.
class Factionstable extends Component {

  render() {
    return (
      <Factionwrap>
        <Styledinfo>Lorem ipsum dolor sit amet, eos docendi appellantur ei, nemore essent ne ius. Mentitum appetere interesset eum no. Ne mei gloriatur honestatis scriptorem. Nisl habeo eripuit in sea.</Styledinfo>
        <Styledtable inverted>
          <Table.Header>
            <Table.HeaderCell width={2}>Predict</Table.HeaderCell>
            <Table.HeaderCell width={10}>Faction/Attacker</Table.HeaderCell>
            <Table.HeaderCell width={4}>Probability %</Table.HeaderCell>
          </Table.Header>
        </Styledtable>
        <FactionRows factionsData={MockData}/>
        <Styledbutton longButton="true">Submit</Styledbutton>
      </Factionwrap>
    );
  }
}

export default Factionstable;
