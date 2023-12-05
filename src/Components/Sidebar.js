import { useState, useEffect } from 'react';
import { Link,NavLink } from 'react-router-dom';
import Logo from '../assets/IMG/Acire_logo.svg';
import { IoChevronForward } from 'react-icons/io5';

import {
    DashboardIcon,
    CloseIcon,
  } from '../assets/Icons/Icon';

  import { SideBarLinks } from './Link';
  import './Sidebar.css';

  const SideLink = ({
    data,
    setOpenedId,
    openedId,
    setDashboard,
    closeSideBar,
  }) => {
    const [active, setActive] = useState(false);
    const [expand, setExpand] = useState(false);
  
    const setDashboardActive = () => {
      const link = window.location.pathname;
      setDashboard(link === '/dashboard');
    };
  
    useEffect(() => {
      setActive(openedId === data.id);
      setExpand(openedId === data.id);
      setDashboardActive();
    }, [openedId]);
  
    useEffect(() => {
      const link = window.location.pathname;
      
      // Ensure data is defined and has children property
      if (data && data.children) {
        setDashboardActive();
    
        // Use Array.isArray to check if children is an array
        if (Array.isArray(data.children)) {
          data.children.forEach((child) => {
            if (link === child.link) {
              setActive(true);
              setExpand(true);
            }
          });
        }
      }
    }, [data]);

    return(
        <div className={`side-link-wrap ${active ? 'active' : ''}`}>
      <div
        className={`side-link ${active ? 'active' : ''} ${
          expand ? 'expand' : ''
        }`}
        onClick={() => setExpand(!expand)}
      >
        <data.icon />
        <span>{data.name}</span>
        <IoChevronForward className="arrow" />
      </div>
      {expand ? (
        <div className="side-link-child">
          {data.children.map((child) => (
            <NavLink
              key={child.id}
              to={child.link}
              onClick={() => {
                setOpenedId(data.id);
                closeSideBar();
              }}
            >
              {child.name}
            </NavLink>
          ))}
        </div>
      ) : null}
    </div>

    )
}
const SideBar = ({ sideBar, setSideBar }) => {
    const [openedId, setOpenedId] = useState(null);
    const [active, setActive] = useState(false);
  
    const chechLocation = () => {
      const link = window.location.pathname;
      if (link === '/dashboard') {
        setOpenedId('');
      }
  
      setActive(openedId == '');
    };
  
    const closeSideBar = () => setSideBar(false);
  
    useEffect(() => {
      chechLocation();
    }, [openedId]);
  
    return (
      <aside className={sideBar ? 'open' : ''} style={{height:"100%"}}>
        <div className="sidebar-control">
          <img src={Logo} alt="Acire Logo" className="logo" />
          <button className="menu" onClick={closeSideBar}>
            <CloseIcon />
          </button>
        </div>
  
        <div className="side-nav">
          <Link
            to="/dashboard"
            className={`side-link-wrap side-link dash ${active ? 'active' : ''}`}
            onClick={() => {
              setOpenedId('');
              closeSideBar();
            }}
          >
            <DashboardIcon />
            <span>Dashboard</span>
          </Link>
          {SideBarLinks.slice(0, 2).map((link) => (
            <SideLink
              key={link.id}
              data={link}
              openedId={openedId}
              setOpenedId={setOpenedId}
              setDashboard={setActive}
              closeSideBar={closeSideBar}
            />
          ))}
  
         
          {SideBarLinks.slice(3).map((link) => (
            <SideLink
              key={link.id}
              data={link}
              openedId={openedId}
              setOpenedId={setOpenedId}
              setDashboard={setActive}
              closeSideBar={closeSideBar}
            />
          ))}
        </div>
     
      </aside>
    );
  };
  
  export default SideBar;
  