import React, { Component } from 'react'
import { Tab, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

// Styled components

const Styledtab = styled(Tab)`

`;



// TAB CONTENT - Panes
const panes = [
  { menuItem: <Menu.Item key="ioc">Scenarios</Menu.Item>, render: () =>
    <Tab.Pane>
      <div>One</div>
    </Tab.Pane>
  },
  { menuItem: <Menu.Item key="ioc">TTPs</Menu.Item>, render: () =>
    <Tab.Pane>
      <div>Two</div>
    </Tab.Pane>
  },
  { menuItem: <Menu.Item key="ioc">Detect</Menu.Item>, render: () =>
    <Tab.Pane>

    </Tab.Pane>
  },
  { menuItem: <Menu.Item key="ioc">Protect</Menu.Item>, render: () =>
    <Tab.Pane>

    </Tab.Pane>
  },
  { menuItem: <Menu.Item key="ioc">Respond</Menu.Item>, render: () =>
    <Tab.Pane>

    </Tab.Pane>
  },
  { menuItem: <Menu.Item key="ioc">Paybooks</Menu.Item>, render: () =>
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
