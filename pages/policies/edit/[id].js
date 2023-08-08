import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getSinglePolicy } from '../../../API/policies';
import AddPolicy from '../../../components/Forms/AddPolicyForm';

export default function EditPolicy() {
  const router = useRouter();
  const { id } = router.query;
  const [policy, setPolicy] = useState({});

  useEffect(() => {
    getSinglePolicy(id).then(setPolicy);
  });

  return <AddPolicy obj={policy} />;
}
