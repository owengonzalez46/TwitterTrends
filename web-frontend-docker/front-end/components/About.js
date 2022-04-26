import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './NavBar';
import ServerStats from './ServerStats';
import { Footer } from './Footer';
import { Profiles } from './Profiles';
import { Project } from './Project';



class About extends Component {

  render() {
    
    return (

      <div className="About">
        <NavBar></NavBar>
        <Project></Project>
        <Profiles></Profiles>
        <ServerStats></ServerStats>
        <Footer></Footer>
      </div>
    );
  }
}

export default About;