import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

class Navaccordion extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({activeIndex: newIndex})
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Accordion inverted>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>Scenario 1 <Icon name="dropdown"/></Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>This is the content. Boosh</Accordion.Content>

        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>Scenario 2 <Icon name="dropdown"/></Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>This is the content. Blammo</Accordion.Content>

        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>Scenario 3 <Icon name="dropdown"/></Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>This is the content. Blammo</Accordion.Content>
      </Accordion>
    );
  }
}

export default Navaccordion;
