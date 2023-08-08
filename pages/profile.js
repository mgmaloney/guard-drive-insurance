import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import ShowUser from '../components/ShowUser';
import { getSingleUser } from '../API/user';

export default function Profile() {
  const [customer, setCustomer] = useState({});
  const { user } = useAuth();
  useEffect(() => {
    getSingleUser(user.id).then(setCustomer);
  }, [user]);
  return <ShowUser userObj={customer} />;
}
