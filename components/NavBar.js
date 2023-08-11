/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsdCL3GDUqMdWq0VtCDTGDHUgHvWaJTY6lA&usqp=CAU';

  const [homeImage, setHomeImage] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  const [addPolicyImage, setAddPolicyImage] = useState(false);
  const [signOutImage, setSignOutImage] = useState(false);

  const setterSignOut = () => {
    if (signOutImage) {
      setSignOutImage(false);
    } else {
      setSignOutImage(true);
    }
  };

  const setterHome = () => {
    if (homeImage) {
      setHomeImage(false);
    } else {
      setHomeImage(true);
    }
  };
  const setterProfile = () => {
    if (profileImage) {
      setProfileImage(false);
    } else {
      setProfileImage(true);
    }
  };
  const setterPolicy = () => {
    if (addPolicyImage) {
      setAddPolicyImage(false);
    } else {
      setAddPolicyImage(true);
    }
  };

  return (
    <div className="nav-div">
      <Navbar className="custom-nav" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link passHref href="/">
            <Navbar.Brand>Guard Drive Insurance</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
              <Link passHref href="/">
                <Nav.Link onMouseEnter={setterHome} onMouseLeave={setterHome}>
                  Home
                  <span>{homeImage ? <img className="car" src={imageSrc} /> : ''}</span>
                </Nav.Link>
              </Link>
              <Link passHref href="/profile">
                <Nav.Link onMouseEnter={setterProfile} onMouseLeave={setterProfile}>
                  Profile
                  <span>{profileImage ? <img className="car" src={imageSrc} /> : ''}</span>
                </Nav.Link>
              </Link>
              <Link passHref href="/policies/new">
                <Nav.Link onMouseEnter={setterPolicy} onMouseLeave={setterPolicy}>
                  Add Policy
                  <span>{addPolicyImage ? <img className="car" src={imageSrc} /> : ''}</span>
                </Nav.Link>
              </Link>
              <Button variant="danger" onMouseEnter={setterSignOut} onMouseLeave={setterSignOut} onClick={signOut}>
                Sign Out
              </Button>
              {signOutImage ? <img className="car" src={imageSrc} /> : ''}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
