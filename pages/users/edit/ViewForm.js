import React from 'react';
import { useAuth } from '../../../utils/context/authContext';
import RegisterForm from '../../../components/RegisterForm';

export default function EditBook() {
  const { user } = useAuth();

  // TODO: pass object to form
  return (<RegisterForm user={user} />);
}
