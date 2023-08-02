import { useAuth } from '../utils/context/authContext';
import ShowUser from '../components/ShowUser';

export default function Profile() {
  const { user } = useAuth();
  return <ShowUser userObj={user} />;
}
