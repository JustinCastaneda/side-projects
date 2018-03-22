import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';

const panes = [
  { menuItem: 'Indicators of Compromise', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Detection Signatures', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Threat Mitigations', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]

const Ioctabs = () => (
  <Tab menu={{ text: true }} panes={panes} />
)

export default Ioctabs;
