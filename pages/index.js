import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPolicies } from '../API/policies';

function Home() {
  const { user } = useAuth();
  const [userPolicies, setUserPolicies] = useState([]);

  useEffect(() => {
    getPolicies(user.id).then(setUserPolicies);
  }, []);

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '40vh',
          maxHeight: '1000px',
          padding: '10px',
          margin: '0 auto',
        }}
      >
        <h1>Hello {user.fbUser.displayName}! </h1>
        <h2>Your Current Policies: </h2>
      </div>
      <div className="your-policies">
        {userPolicies.map((policy) => (
          <Card className="policy-card">
            <Card.Header>Policy</Card.Header>
            <Card.Body>
              <Card.Title>{policy.company}</Card.Title>
              <Card.Text>
                <p>Policy Vehicle: {policy.vehicle}</p>
                <p>Coverages: </p>
                <ul>
                  {policy.coverages.map((coverage) => (
                    <li className="coverage-li">{coverage.coverage_id.type}</li>
                  ))}
                </ul>
              </Card.Text>
              <Link passHref href={`/policies/${policy.id}`}>
                <Button className="policy-btn" variant="primary">View Policy</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Home;
