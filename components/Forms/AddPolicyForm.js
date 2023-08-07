import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { FloatingLabel, Button } from 'react-bootstrap';

import { createPolicy } from '../../API/policies';
import { createCoverage, getAllCoverages } from '../../API/coverages';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  company: '',
  vehicle: '',
  coverage: '',
};
export default function AddPolicy({ obj }) {
  const { user } = useAuth();
  const router = useRouter();

  const [formInput, setFormInput] = useState(initialState);
  const [coverages, setCoverages] = useState([]);
  const [userCoverages, setUserCoverages] = useState([]);

  useEffect(() => {
    getAllCoverages().then(setCoverages);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.warn('name', name, 'value', value);
    setFormInput((prevState) => ({ ...prevState, [name]: value }));
    console.warn('handleChange input', formInput);
  };

  const addCoverage = () => {
    console.warn('formInput', formInput);
    const addedCoverageArr = [...userCoverages, formInput.coverage];
    console.warn('addedCoverageArr', addedCoverageArr);
    setUserCoverages(addedCoverageArr);
    console.warn('userCOverage', userCoverages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const policyId = await createPolicy({ userId: user.id, ...formInput });
    userCoverages.forEach(async (coverageId) => {
      await createCoverage(policyId, { coverageId });
    });
    router.back();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Policy</h2>
        <FloatingLabel controlId="floatingInput1" label="Company" className="mb-3">
          <Form.Control type="text" placeholder="Company" name="company" value={formInput.company} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Vehicle" className="mb-3">
          <Form.Control type="text" placeholder="Vehicle" name="vehicle" value={formInput.vehicle} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput3" label="Coverages">
          <Form.Select aria-label="Coverage" name="coverage" className="mb-3" value={formInput.coverage} onChange={handleChange} required>
            <option>Select Coverages</option>
            {coverages.map((coverage) => (
              <option key={coverage.id} value={coverage.id}>
                {coverage.type}
              </option>
            ))}
          </Form.Select>
          <Button onClick={addCoverage} variant="secondary" size="sm" active>
            +
          </Button>
        </FloatingLabel>

        <Button type="submit">{obj.id ? 'Update' : 'Create'} Policy</Button>
      </Form>
    </>
  );
}

AddPolicy.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    userId: PropTypes.string,
    company: PropTypes.string,
    coverages: PropTypes.shape([
      PropTypes.shape({
        id: PropTypes.number,
        type: PropTypes.string,
      }),
    ]),
  }),
};

AddPolicy.defaultProps = {
  obj: initialState,
};
