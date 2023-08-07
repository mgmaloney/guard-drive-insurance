import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deletePolicy, getSinglePolicy } from '../../API/policies';

export default function ViewPolicy() {
  const [policy, setPolicy] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePolicy(id).then(setPolicy);
  }, [id]);

  const deleteViewedPolicy = async () => {
    await deletePolicy(policy.id);
  };

  return (
    <>
      <div className="header">
        <h1>Policy: </h1>
      </div>
      <div className="policy-body">
        <p>Company: {policy.company}</p>
        <p>Policy Vehicle: {policy.vehicle}</p>
        <p>Coverages: </p>
        <ul>
          {policy.coverages.forEach((coverage) => (
            <li className="coverage-li">{coverage.coverageId.type}</li>
          ))}
        </ul>
        <Link passHref href={`/policies/edit/${policy.id}`}>
          <Button type="button">Edit Policy</Button>
        </Link>
        <Button onClick={deleteViewedPolicy}>Delete Policy</Button>
      </div>
    </>
  );
}
