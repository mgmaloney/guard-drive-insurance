import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user.fbUser.email,
    uid: user.uid,
    profileImageUrl: '',
    address: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
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
    fbUser: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }),
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
