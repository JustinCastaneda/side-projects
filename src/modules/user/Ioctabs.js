import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';

import styled from 'styled-components';

import Iocicon from '../../resources/images/ioc_icon.png'
import Wallicon from '../../resources/images/wall_icon.png'
import Fileicon from '../../resources/images/file_icon.png'
import Tmicon from '../../resources/images/trojan_icon.png'

// const styles = {
//   root: {
//     width: '50%'
//   },
//   tab: {
//     maxHeight: '60px',
//     display: 'flex',
//     margin: '0 auto 15px auto'
//   },
//   text: {
//     color: '#ffffff',
//     textAlign: 'center',
//     fontFamily: 'Industry Inc'
//   }
// }

const Styledhalf = styled.div`
  float: left;
  width: 50%;
  border-right: 1px solid #333;
  border-width: ${props => props.noborder ? '0' : '1px'};
`;

const Styledimage = styled.img`
  width: 100%;
  height: 100%;
  padding: .5rem 3rem .5rem 3rem;
`;

const Styledtext = styled.p`
  color: #fff;
  text-align: center;
  font-family: 'Industry Inc';
  text-shadow: 0 0 16px 6px rgba(33, 133, 208, 0.45)
`;



const Iocimage = ({image1, image2, text}) => (
  <div>
    <Styledhalf>
      <Styledimage src={image1} alt={text}/>
      <Styledtext>{text}</Styledtext>
    </Styledhalf>
    <Styledhalf noborder="true">
      <Styledimage src={image2} alt={text}/>
      <Styledtext>{text}</Styledtext>
    </Styledhalf>
  </div>
)



const panes = [
  { menuItem: 'Indicators of Compromise', render: () => <Tab.Pane><Iocimage image1={Iocicon} image2={Fileicon} text="Indicators of Compromise"/></Tab.Pane> },
  { menuItem: 'Detection Signatures', render: () => <Tab.Pane><Iocimage image1={Wallicon} image2={Fileicon} text="Detection Signatures"/></Tab.Pane> },
  { menuItem: 'Threat Mitigations', render: () => <Tab.Pane><Iocimage image1={Tmicon} image2={Fileicon} text="Threat Mitigations"/></Tab.Pane> },
]

const Ioctabs = () => (
  <Tab menu={{ text: true }} panes={panes} />
)

export default Ioctabs;
