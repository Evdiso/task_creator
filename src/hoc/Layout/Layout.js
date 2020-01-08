import React, {Component} from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'

class Layout extends Component{

  state = {
    sidebarActive: false
  };

  onActiveSidebarHandler = () => {
    this.setState({
      sidebarActive: !this.state.sidebarActive
    })
  };

  render() {
    let mainClass = 'main';
    let isOpen = this.state.sidebarActive;
    if (isOpen) {
      mainClass += ' active';
    };

    return (
      <div className={'layout'}>
        <Sidebar
          sidebarActive={this.state.sidebarActive}
          onActiveSidebarHandler={this.onActiveSidebarHandler}
        />
        <Header
          sidebarActive={this.state.sidebarActive}
          onActiveSidebarHandler={this.onActiveSidebarHandler}
        />
        <main className={mainClass}>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout