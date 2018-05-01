import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import styled from 'styled-components'

// Styled components
const Styledtable = styled(Table)`
  &&& {
    padding: 1rem;
    background: transparent;
    text-align: center;
    margin: 0;
    padding: 0;
    border-radius: 0;
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

const Styledh3 = styled.h3`
  text-align: center;
  font-size: 1.2rem;
`;

// Mock MockData

const MockData = [
  {
    id: 1,
    date: '1/12/2018',
    timeStamp: '12:15:12',
    type: 'IoC',
    viewLink: '/submissions'
  },
  {
    id: 2,
    date: '4/16/2018',
    timeStamp: '10:12:12',
    type: 'IoC',
    viewLink: '/submissions'
  },
  {
    id: 3,
    date: '7/14/2018',
    timeStamp: '11:19:12',
    type: 'DT',
    viewLink: '/submissions'
  }
];

// We'll need to figure out how to show the submission, for now it's just a link.
function SubmissionList(props) {
  const submissions = props.submissionData;
  const listItems = submissions.map((submission)=>
  <Table.Row id={submission.id}>
    <Table.Cell width={4}>{submission.date}</Table.Cell>
    <Table.Cell width={4}>{submission.timeStamp}</Table.Cell>
    <Table.Cell width={4}>{submission.type}</Table.Cell>
    <Table.Cell width={4}><a href={`${submission.viewLink}-${submission.id}`}>View Submission</a></Table.Cell>
  </Table.Row>
  );
  return (
    <Table.Body>{listItems}</Table.Body>
  )
}


/*
To Do:
- Write code that adds submissions to the data, in this case that would be the replacement for MockData
- Figure out how to pull up the submissions. Not sure if we want to do a modal, or just a list of all of the submissions. The component right now calls for a link - that's another option.
 */
class Viewsubmissions extends Component {
  render() {
    return (
      <div>
        <Styledh3>View All Submissions</Styledh3>
        <Styledtable inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={4}>Date</Table.HeaderCell>
              <Table.HeaderCell width={4}>Time Stamp</Table.HeaderCell>
              <Table.HeaderCell width={4}>Type</Table.HeaderCell>
              <Table.HeaderCell width={4}>View</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <SubmissionList submissionData={MockData} />
        </Styledtable>
      </div>
    );
  }
}

export default Viewsubmissions;
