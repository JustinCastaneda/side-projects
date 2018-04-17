import React, { Component } from 'react'
import { Tab, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

import Navaccordion from './Navaccordion'

// Styled components

const Styledtab = styled(Tab)`
  &&& {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 3.1rem 0 0 0;
    .ui.text.menu {
      position: relative;
      top: 0;
      bottom: 0;
      left: 0;
      width: 12.5%;
      height: 100%;
      margin: 0;
      flex-flow: column nowrap;
      justify-content: space-between;
      a {
        flex: 1 1 auto;
        justify-content: center;
        color: #eee;
        transform: rotate(180deg);
        transform-origin: center center;
        writing-mode: vertical-lr;
        text-align: center;
        width: 100%;
        height: 100%;
        font-size: .9rem;
        border: 1px solid #ccc;
        border-width: 0 0 1px 2px;
        border-left-color: #2185D0;
        background-color: #252525;
        &:first-child {
          border-bottom: 0;
        }
        &:last-child {
          border-top-right-radius: 7px;
        }
        &.active {
          color: #fff;
          border-left: transparent;
          background-color: transparent;
        }
      }
    }
    .ui.attached.bottom {
      position: absolute;
      top: 3rem;
      bottom: 0;
      right: 0;
      left: 15%;
      width: 85%;
      margin: 0;
      background: transparent;
      border: none;
    }
  }
`;


// TAB CONTENT - Panes
const panes = [
  { menuItem: <Menu.Item key="scenarios">Scenarios</Menu.Item>, render: () =>
    <Tab.Pane>
      <Navaccordion />
    </Tab.Pane>
  },
  { menuItem: <Menu.Item key="ttps">TTPs</Menu.Item>, render: () =>
    <Tab.Pane>
      <div>Two</div>
    </Tab.Pane>
  },
  { menuItem: <Menu.Item key="detect">Detect</Menu.Item>, render: () =>
    <Tab.Pane>
      <div>Three</div>
    </Tab.Pane>
  },
  { menuItem: <Menu.Item key="protect">Protect</Menu.Item>, render: () =>
    <Tab.Pane>

    </Tab.Pane>
  },
  { menuItem: <Menu.Item key="respond">Respond</Menu.Item>, render: () =>
    <Tab.Pane>

    </Tab.Pane>
  },
  { menuItem: <Menu.Item key="playbooks">Playbooks</Menu.Item>, render: () =>
    <Tab.Pane>

    </Tab.Pane>
  }
]

class Navigationtabs extends Component {
  render() {
    return (
      <Styledtab menu={{ text: true }} panes={panes} />
    );
  }
}

export default Navigationtabs;
