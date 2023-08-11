import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { FloatingLabel, Button } from 'react-bootstrap';
import { createPolicy, updatePolicy } from '../../API/policies';
import { createCoverage, deleteAllPolicyCoverages, getAllCoverages } from '../../API/coverages';
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
  const [addRemoveCoverages, setAddRemoveCoverages] = useState([]);
  const [submitBtnName, setSubmitBtnName] = useState('');

  useEffect(() => {
    if (obj.id) {
      setFormInput({
        company: obj.company,
        vehicle: obj.vehicle,
      });
    }
  }, [obj.id]);

  useEffect(() => {
    if (obj.id) {
      setAddRemoveCoverages(obj.coverages);
    }
  }, [obj]);

  useEffect(() => {
    getAllCoverages().then(setCoverages);
  }, []);

  useEffect(() => {
    const coverageIds = [];
    obj.coverages?.forEach((coverage) => {
      coverageIds.push(coverage.coverage_id.id);
    });
    setUserCoverages(coverageIds);
  }, [obj.coverages]);

  useEffect(() => {
    if (obj.id) {
      setSubmitBtnName('update');
    } else {
      setSubmitBtnName('create');
    }
  }, [obj]);

  const addCoverage = () => {
    const addedCoverageArr = [...userCoverages, formInput.coverage];
    setUserCoverages(addedCoverageArr);
    coverages.forEach((coverage) => {
      if (coverage.id === Number(formInput.coverage)) {
        const coverageToAdd = {
          coverage_id: {
            id: coverage.id,
            type: coverage.type,
          },
        };
        setAddRemoveCoverages((prevState) => [...prevState, coverageToAdd]);
      }
    });
  };

  const removeCoverage = (e) => {
    const coverageToRemove = e.target.value;
    const userCoveragesCopy = [...userCoverages];
    const addRemoveCoveragesCopy = [...addRemoveCoverages];
    const coverageIndex = userCoveragesCopy.findIndex((coverage) => coverage === coverageToRemove);
    userCoveragesCopy.splice(coverageIndex, 1);
    addRemoveCoveragesCopy.splice(coverageIndex, 1);
    setUserCoverages(userCoveragesCopy);
    setAddRemoveCoverages(addRemoveCoveragesCopy);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitBtnName === 'create') {
      const policyId = await createPolicy({ userId: user.id, ...formInput });
      userCoverages.forEach(async (coverageId) => {
        await createCoverage(policyId, { coverageId });
      });
    } else if (submitBtnName === 'update') {
      await deleteAllPolicyCoverages(obj.id);
      await updatePolicy({ userId: user.id, id: obj.id, ...formInput });
      userCoverages.forEach(async (coverageId) => {
        await createCoverage(obj.id, { coverageId });
      });
      router.back();
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-black mt-5 create-policy-header">{obj.id ? 'Update' : 'Create'} Policy</h2>
        <FloatingLabel controlId="floatingInput1" label="Company" className="mb-3">
          <Form.Control type="text" placeholder="Company" className="text-input" name="company" value={formInput.company} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Vehicle" className="mb-3">
          <Form.Control type="text" placeholder="Vehicle" className="text-input" name="vehicle" value={formInput.vehicle} onChange={handleChange} required />
        </FloatingLabel>

        <div className="coverage-selecting">
          <Form.Select aria-label="Coverage" name="coverage" style={{ width: '20rem' }} className="mb-3 coverage-select" value={formInput.coverage} onChange={handleChange}>
            <option>Select Coverages</option>
            {coverages.map((coverage) => (
              <option key={coverage.id + 1} value={coverage.id}>
                {coverage.type}
              </option>
            ))}
          </Form.Select>

          <Button className="add-coverage-btn" onClick={addCoverage} variant="secondary" size="sm" active>
            +
          </Button>
        </div>

        <div className="coverages-div">
          <Form.Text className="coverage-header">Coverages Added: </Form.Text>
          {addRemoveCoverages?.map((coverage) => (
            <>
              <Form.Text className="added-coverages" key={coverage.coverage_id.id}>
                {coverage.coverage_id?.type}
              </Form.Text>
              <Button variant="primary" size="sm" key={coverage.coverage_id.id + 2} value={coverage.coverage_id?.id} type="button" className="remove-coverage-btn" onClick={removeCoverage}>
                X
              </Button>
            </>
          ))}
        </div>

        <Button className="create-update-btn" type="submit">
          {obj.id ? 'Update' : 'Create'} Policy
        </Button>
      </Form>
    </>
  );
}

AddPolicy.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.string,
    vehicle: PropTypes.string,
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
