import React, { Component } from 'react'
import { Tab, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

import Artifactinfo from './Artifactinfo'
import Scenarioquestion from './Scenarioquestion'
import Tradingtable from './Tradingtable'
import Viewsubmissions from './Viewsubmissions'

const Styledtab = styled(Tab)`
  /* &&& for specificity override */
  &&& div.ui.text.menu {
    margin: 0;
    a.item {
      border-radius: 0;
      border-color: #2185D0;
      border-right: 2px solid #2185D0;
      border-bottom: 2px solid #2185D0;
      width: 50%;
      background: #252525;
      color: #eee;
      text-align: center;
      justify-content: center;
      flex-direction: column;
      display: flex;
      padding: 1rem 0;
      font-size: 1rem;
      line-height: 1.2;
      &:last-child {
        border-right: 0 !important;
      }
      &.active {
        color: #fff;
        background: transparent;
        border-bottom-width: 0;
      }
    }
  }
  &&& .ui.bottom.tab {
    position: absolute;
    top: 6.5rem;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparent;
    color: #fff;
    border: none;
    padding: 2rem 3rem;
    overflow: auto;
  }
`;

// Mock Data
const MockData = [
  {
    title: 'Artifact 1',
    text: 'Lorem ipsum dolor sit amet, mel erant verear te, an est eirmod percipit. Altera audiam labores mel ei, te enim blandit molestiae nam. Has no noster salutatus, ad nec essent suscipiantur, omnis legere constituam ei quo. Per id falli laudem possit, homero explicari eam et. Usu wisi quando ei. Hinc graece ea eum. Debet consequuntur qui te, duo at paulo admodum efficiendi. Vide urbanitas sit ei, delicata intellegebat vis eu. Ornatus sententiae no sea, dolorem fabellas ea sea.',
    config: '/test',
    info: '/test2'
  }
];

const MockQuestion = [
  {
    title: 'Estimate Your Effort',
    question: 'How long will it take you to solve this artifact?'
  }
];


// TAB CONTENT - Panes
/*
To Do:
Needs to render a different component in Tab.Pane, depending on what has been clicked
Not sure how to pass that state/prop in
*/

const panes = [
  { menuItem: <Menu.Item key="ioc">Artifact Information</Menu.Item>, render: () =>
    <Tab.Pane>
      <Artifactinfo title={MockData[0].title} text={MockData[0].text} config={MockData[0].config} info={MockData[0].info} />
      <Scenarioquestion title={MockQuestion[0].title} question={MockQuestion[0].question} />
    </Tab.Pane>
  },
  { menuItem: <Menu.Item key="ds">Attack Tactics Market</Menu.Item>, render: () =>
    <Tab.Pane>
      <Tradingtable />
    </Tab.Pane>
  }
]

// TAB CONTENT - Tab Parent
const Centernavtabs = () => (
  <Styledtab menu={{ text: true }} panes={panes}/>
)

class Centernav extends Component {
  render() {
    return (
      <Centernavtabs centerComponent={this.props.centerComponent}/>
    );
  }
}

export default Centernav;
