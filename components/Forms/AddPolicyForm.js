// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import Form from 'react-bootstrap/Form';
// import { FloatingLabel, Button } from 'react-bootstrap';

// export default function AddPolicy() {
//   const user = {};
//   const router = useRouter();
//   const initialState = {
//     company: '',
//     vehicle: '',
//   };

//   const [formInput, setFormInput] = useState(initialState);
//   const [policies] = useState([]);

//   useEffect(() => {
//     getAllPolicies.then(setPolicies);
//   });

//   const handleChange = (e) => {
//     const [name, value] = e.target;
//     setFormInput((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const addCoverage = () => {

//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await createPolicy({ userId: user.id, ...formInput });
//     router.back();
//   };

//   return (
//     <>
//       <Form onSubmit={handleSubmit}>
//         <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Policy</h2>
//         <FloatingLabel controlId="floatingInput1" label="Company" className="mb-3">
//           <Form.Control type="text" placeholder="Company" name="name" value={formInput.name} onChange={handleChange} required />
//         </FloatingLabel>
//         <FloatingLabel controlId="floatingInput2" label="Coverages">
//           <Form.Select aria-label="User Team" name="userTeam" className="mb-3" required>
//             <option value="">Select a Team</option>
//             {coverages.map((team) => (
//               <option key={coverage.id} value={coverage.id}>
//                 {coverage.type}
//               </option>
//             ))}
//           </Form.Select>
//         </FloatingLabel>

//         <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Policy</Button>
//       </Form>
//     </>
//   );
// }
