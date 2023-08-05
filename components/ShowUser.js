/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { deleteUser } from '../API/user';

function ShowUser({ userObj }) {
  console.warn(userObj);
  const deleteThisUser = () => {
    if (window.confirm('Delete your account?')) {
      deleteUser(userObj.id).then(() => signOut());
    }
  };

  return (
    <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={userObj.profile_image_url} />
      <Card.Body>
        <Card.Title>{userObj.first_name} {userObj.last_name}</Card.Title>
        <Card.Text>
          <h3>Contact information</h3>
          <>
            <h4>{userObj.address}</h4>
            <h4>{userObj.phone_number}</h4>
            <h4>{userObj.email}</h4>
          </>
        </Card.Text>
        <Link href="/users/edit/ViewForm" passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button type="button" variant="primary" onClick={signOut}>Log Out</Button>
        <Button type="button" variant="danger" onClick={deleteThisUser}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default ShowUser;

ShowUser.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    address: PropTypes.string,
    phone_number: PropTypes.string,
    profile_image_url: PropTypes.string,
  }).isRequired,
};
