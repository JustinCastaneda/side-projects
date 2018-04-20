import React, { Component } from 'react'
import { Accordion, Icon, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

import Lighticon from '../../resources/images/light_icon.png'
import Compicon from '../../resources/images/computer_icon.png'
import Bombicon from '../../resources/images/bomb_icon.png'

// Styled Components

const Styledaccordion = styled(Accordion)`
  &&& {
    .title>i.dropdown {
      display: none;
    }
    .content {
      color: #fff;
      padding-left: 2rem !important;
    }
  }
`;

const Styledtitlepane = styled.div`
  display: flex;
  flex-flow: nowrap;
  align-items: center;
  border-bottom: 1px solid #333;
  padding-bottom: 1rem;
  div {
    margin: 0 2rem 0 2rem;
    flex: 2 2 auto;
  }
  h4 {
    color: #fff;
    margin: 0;
    padding: 0;
  }
  h5 {
    color: #ccc;
    margin: 0;
    padding-top: .25rem;
  }
  i {
    color: #fff;
    text-align: right;
  }
`;

const Styledimage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  position: relative;
`;

const Styledlist = styled.ul`
  list-style: none;
  li {
    color: #fff;
  }
`;

// Data
const MockDataOne = [
  {
    id: 0,
    name: 'Artifact 1',
    icon: Bombicon,
    content: 'This is the mock content for the first tab'
  },
  {
    id: 1,
    name: 'Artifact 2',
    icon: Compicon,
    content: 'This is the mock content for the second tab'
  },
  {
    id: 2,
    name: 'Artifact 3',
    icon: Lighticon,
    content: 'This is the mock content for the second tab'
  },
  {
    id: 3,
    name: 'Artifact 4',
    icon: Bombicon,
    content: 'This is the mock content for the second tab'
  }
]


const AccordionTitle = ({ icon, children, subtitle }) => (
  <Styledtitlepane>
    <Styledimage src={icon} alt={icon}/>
    <div>
      <h4>{children}</h4>
      <h5>{subtitle}</h5>
    </div>
    <Icon name="dropdown"/>
  </Styledtitlepane>
)

const rootPanels = MockDataOne.map(item => ({
  title: {
    content: <AccordionTitle icon={item.icon} subtitle="Subtitle">{item.name}</AccordionTitle>,
    key: `tab-${item.id}`
  },
  content: {
    content: item.content,
    key: `tab-${item.id}`
  }
}));

class Navaccordion extends Component {
  state = { activeIndex: 0 }

  handleTitleClick = (e, itemProps) => {
    const { index } = itemProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({activeIndex: newIndex})
  }

  render() {
    const { activeIndex } = this.state

    return(
      <Styledaccordion dataSource={this.dataSource} fluid inverted activeIndex={activeIndex} panels={rootPanels} onTitleClick={this.handleTitleClick} />
    );

  }
}

export default Navaccordion;
