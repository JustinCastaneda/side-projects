import React from 'react'
import { Tab, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

import Commonmodal from '../common/Commonmodal'
import Tabcontent from './Tabcontent'

import Iocicon from '../../resources/images/ioc_icon.png'
import Wallicon from '../../resources/images/wall_icon.png'
import Fileicon from '../../resources/images/file_icon.png'
import Tmicon from '../../resources/images/trojan_icon.png'

// Styled Components

const Styledtab = styled(Tab)`
  /* &&& for specificity override */
  &&& div.ui.text.menu {
    margin: 0;
    a.item {
      border-radius: 0;
      border-color: #2185D0;
      border-right: 2px solid #7d7d7d;
      border-bottom: 2px solid #2185D0;
      width: 33.3333333%;
      background: #333;
      color: #fff;
      text-align: center;
      justify-content: center;
      flex-direction: column;
      display: flex;
      padding: .4rem 0;
      font-size: .9rem;
      line-height: 1.2;
      &:first-child {
        border-radius: 6px 0 0 0;
      }
      &:last-child {
        border-radius: 0 6px 0 0;
        border-right: 0 !important;
      }
      &.active {
        color: #fff;
        background: transparent;
        border-bottom-width: 0;
        border-right: 2px solid #2185D0;
      }
    }
  }
`;

const Styledhalf = styled.div`
  float: left;
  width: 50%;
  border-right: 1px solid #333;
  border-width: ${props => props.noborder ? '0' : '1px'};
  cursor: pointer;
  margin: 1.8rem 0;
  &:hover {
    img {
      filter: brightness(1.3);
    }
    p {
      text-shadow: 0 0 12px #2185D0;
    }
  }
`;

const Styledimage = styled.img`
  width: 100%;
  height: 100%;
  padding: 0 0 .5rem 0;
  max-width: 4rem;
  margin: 0 auto;
  display: flex;
`;

const Styledtext = styled.p`
  color: #fff;
  text-align: center;
  font-family: 'Industry Inc';
  font-size: .9rem;
`;

// TAB CONTENT - Layout Container
const Iocimage = ({ noborder, image, line1, line2 }) => (
  <div>
    <Styledhalf noborder={noborder}>
      <Styledimage src={image} alt="icon"/>
      <Styledtext>{line1}<br/>{line2}</Styledtext>
    </Styledhalf>
  </div>
)

// TAB CONTENT - Link Icons
const Ioclink = () => (
  <Iocimage image={Iocicon} line1="Indicators of" line2="Compromise"/>
)
const Detsiglink = () => (
  <Iocimage image={Wallicon} line1="Detection" line2="Signatures"/>
)
const Threatmitlink = () => (
  <Iocimage image={Tmicon} line1="Threat" line2="Mitigations"/>
)

// TAB CONTENT - Panes
const panes = [
  { menuItem: <Menu.Item key="ioc">Indicators of<br/>Compromise</Menu.Item>, render: () =>
    <Tab.Pane>
      <Commonmodal modalSize="small" triggerButton={ Ioclink() } modalHeader="Indicators of Compromise" modalContent={ Tabcontent() }/>
      <Iocimage noborder image={Fileicon} line1="View All" line2="Submissions"/>
    </Tab.Pane>
  },
  { menuItem: <Menu.Item key="ds">Detection<br/>Signatures</Menu.Item>, render: () =>
    <Tab.Pane>
      <Commonmodal modalSize="small" triggerButton={ Detsiglink() } modalHeader="Detection Signatures" modalContent={ Tabcontent() }/>
      <Iocimage noborder image={Fileicon} line1="View All"  line2="Submissions"/>
    </Tab.Pane>
  },
  { menuItem: <Menu.Item key="tm">Threat<br/>Mitigations</Menu.Item>, render: () =>
    <Tab.Pane>
      <Commonmodal modalSize="small" triggerButton={ Threatmitlink() } modalHeader="Threat Mitigations" modalContent={ Tabcontent() }/>
      <Iocimage noborder image={Fileicon} line1="View All"  line2="Submissions"/>
    </Tab.Pane>
  }
]

// TAB CONTENT - Tab Parent
const Ioctabs = () => (
  <Styledtab menu={{ text: true }} panes={panes} />
)

export default Ioctabs;
