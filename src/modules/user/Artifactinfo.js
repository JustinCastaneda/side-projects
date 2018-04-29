import React, { Component } from 'react'
import styled from 'styled-components'

// Component styles

const Styledinfowrap = styled.div`
  &&& {
    padding: 0 0 2rem;
    h4 {
      font-size: 1.25rem;
    }
    p {
      font-size: 1rem;
    }
    a {
      color: #2185D0;
      text-decoration: underline;
      margin-right: 1rem;
    }
  }
`;

const Topinfo = ({ title, text, config, info}) => (
  <Styledinfowrap>
    <h4>{title}</h4>
    <p>{text}</p>
    <a href={config}>Config Files</a>
    <a href={info}>More Info</a>
  </Styledinfowrap>
)

class Artifactinfo extends Component {
  render(MockData) {
    return (
      <div>
        <Topinfo title={this.props.title} text={this.props.text} config={this.props.config} info={this.props.info}/>
      </div>
    );
  }
}

export default Artifactinfo;
