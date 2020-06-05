import React from 'react';

import TopNav from 'component/top-nav/index.jsx';
import SideNav from 'component/side-nav/index.jsx';
import './theme.css';

class Layout extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id="wrapper">
                test nav
                <TopNav />,
                <SideNav />,
                {this.props.children}
            </div>
        );
    }
}

export default Layout;