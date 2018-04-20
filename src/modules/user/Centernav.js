import React from 'react'
import { Tab, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

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
  }
`;

// TAB CONTENT - Panes
const panes = [
  { menuItem: <Menu.Item key="ioc">Tactics Market</Menu.Item>, render: () =>
    <Tab.Pane>
      <div>Blammo, tab 1 content</div>
    </Tab.Pane>
  },
  { menuItem: <Menu.Item key="ds">Artifact Info</Menu.Item>, render: () =>
    <Tab.Pane>
      <div>Boosh, tab 2 content</div>
    </Tab.Pane>
  }
]

// TAB CONTENT - Tab Parent
const Centernav = () => (
  <Styledtab menu={{ text: true }} panes={panes} />
)

export default Centernav;
