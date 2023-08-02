import React, { useState } from 'react';
// import { useRouter } from 'next/router';

export default function ViewPolicy() {
  const [policy] = useState({});
  // const router = useRouter();
  // const { key } = router.query;

  // useEffect(() => {
  //   getSinglePolicy(key).then(setPolicy);
  // }, []);

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
            <li className="coverage-li">{coverage.type}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
