import React, { useState } from 'react';
import { Alert, Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';

const options = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' }
];

export function AddUsers() {
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
    role: ''
  })
  const [error, seterror] = useState()
  const addOnSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5550/api/register', newUser)
      .then((response) => {
        if (response.data.success) {
          setNewUser({
            fullName: '',
            email: '',
            password: '',
            role: ''
          });
          Swal.fire(response.data.success)
        }
      }).catch((error) => {
        console.log(error);
        seterror(error.response.data.error)

      })
  };

  return (
    <>
      <div className="mx-auto my-20 flex flex-col items-center">
        <div className="max-w-screen-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Add User to website
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">

            </p>
          </div>
          <div className="flex items-center justify-center">

            <div className="flex flex-col w-72 items-end gap-6 ">
              <form onSubmit={addOnSubmit}>
                <Input
                  className="bg-white"
                  type="text"
                  size="lg"
                  label="full Name"
                  name='fullName'
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })}
                />
                <br />
                <Input
                  type="email"
                  size="lg"
                  label="Email"
                  name='email'
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })}
                />
                <br />
                <Input
                  type="password"
                  size="lg"
                  label="Password"
                  name='password'
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })}
                />
                <br />

                <Select
                  className="w-72"
                  options={options}
                  label="Role"
                  name="role"

                  onChange={(selectedOption) => setNewUser({ ...newUser, role: selectedOption.value })}
                />

                <br />
                <Button type='submit' className="w-72" color="green" ripple={true}>Add User</Button>
              </form>
              {error && <Alert color="red" variant="gradient">
                <span>{error}</span>
              </Alert>}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddUsers;
