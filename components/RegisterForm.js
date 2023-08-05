import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { getSingleUser } from '../API/user';

function RegisterForm({ user, updateUser }) {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user.fbUser.email,
    uid: user.uid,
    profileImageUrl: '',
    address: '',
    phoneNumber: '',
    id: '',
  });

  useEffect(() => {
    if (user.id) {
      getSingleUser(user.id).then((userObj) => {
        setFormData((prevState) => ({
          ...prevState,
          id: userObj.id,
          firstName: userObj.first_name,
          lastName: userObj.last_name,
          profileImageUrl: userObj.profile_image_url,
          address: userObj.address,
          phoneNumber: userObj.phone_number,
        }));
      });
    }
  }, [user, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      const payload = {
        id: formData.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: user.email,
        profileImageUrl: formData.profileImageUrl,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
      };
      updateUser(payload).then((router.push('/profile')));
    } else {
      registerUser(formData).then(() => updateUser(user.uid));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* FIRST NAME FIELD */}
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control name="firstName" required value={formData.firstName} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* LAST NAME FIELD */}
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control name="lastName" required value={formData.lastName} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* PROFILE IMAGE URL FIELD */}
      <Form.Group className="mb-3" controlId="profileImageUrl">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control type="url" name="profileImageUrl" required value={formData.profileImageUrl} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* ADDRESS FIELD */}
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Enter your address</Form.Label>
        <Form.Control type="textarea" name="address" required value={formData.address} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* PHONE NUMBER FIELD */}
      <Form.Group className="mb-3" controlId="phoneNumber">
        <Form.Label>Enter your phone number</Form.Label>
        <Form.Control placeholder="XXX-XXX-XXXX" name="phoneNumber" pattern="^\d{3}-\d{3}-\d{4}$" required value={formData.phoneNumber} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    fbUser: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }),
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
