import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { signOut } from '../utils/auth';

function ShowUser({ userObj }) {
  return (
    <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={userObj.profile_image_url} />
      <Card.Body>
        <Card.Title>{userObj.first_name} {userObj.last_name}</Card.Title>
        <Card.Text>
          <h3>Contact information</h3>
          <content>
            <h4>{userObj.address}</h4>
            <h4>{userObj.phone_number}</h4>
            <h4>{userObj.email}</h4>
          </content>
        </Card.Text>
        <Button type="button" onClick={signOut}>Edit Profile</Button>
        <Button type="button" onClick={signOut}>Log Out</Button>
      </Card.Body>
    </Card>
  );
}

export default ShowUser;

ShowUser.propTypes = {
  userObj: PropTypes.shape({
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    address: PropTypes.string,
    phone_number: PropTypes.string,
    profile_image_url: PropTypes.string,
  }).isRequired,
};
