import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  IconButton
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

export function Users() {
  const [usersData, setUsersData] = useState([]);  // State to store users data
  const [Refresh, setRefresh] = useState(true);   // State to run useEffect that get users data


  // Fetch users data from the server
  useEffect(() => {
    axios.get('http://localhost:5550/api/getUser/active').then((response) => {
      setUsersData(response.data);
    }).catch((error) => {
      console.error('Error fetching users data:', error);
    })
  }, [Refresh]);


  // update user role to admin 
  const handleUpdate = (id, role) => {
    if (role === 'admin') {
      Swal.fire('This user already admin')
    } else {
      Swal.fire({
        title: "Are you sure want to change the user role to admin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.put(`http://localhost:5550/api/updateUser/${id}`)
            .then((res) => {
              if (res.data.success) {
                setRefresh(!Refresh)
              }
            })
            .catch((error) => {
              console.error('Error Update users :', error);
            })
        }
      });
    }
  };


  // Update the handleDelete function to remove the deleted user from the state
  const handleDelete = async (id) => {
    const confirmed = await showConfirmationPrompt();
    if (confirmed) {
      axios.put(`http://localhost:5550/api/deleteUser/${id}`).then((res) => {
        // Remove the deleted user from the state
        if (res.data.success) setUsersData(prevData => prevData.filter(user => user._id !== id))
      })
        .catch((error) => {
          console.error('Error delete users :', error);
        })
    }
  };

  const showConfirmationPrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to soft delete this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="green" className="mb-8 p-6">
          <div className="grid grid-cols-6 gap-x-8 justify-end">
            <Typography variant="h6" color="white">
              Users Table
            </Typography>
            <Typography
              as={Link}
              to="/dashboard/User/add"
              className="text-xs font-semibold text-blue-gray-600 justify-center"
            >
              <Button color="blue-gray" size="sm">
                Add User
              </Button>
            </Typography>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID", "Name", "Email", "phone Number", "Role", "Action"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usersData
                .sort((a, b) => (a.role === "admin" ? -1 : b.role === "admin" ? 1 : 0))
                .map(({ _id, fullName, email, role, phoneNumber }, key) => {
                  const className = `py-3 px-5 ${key === usersData.length - 1 ? "" : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {_id}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {fullName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {phoneNumber}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {role}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="grid grid-cols-2 gap-2 justify-center">
                          <div className="justify-center" onClick={() => handleUpdate(_id, role)}>
                            <Typography className="text-xs font-semibold text-blue-gray-600 justify-center">
                              <Tooltip content="change user role to admin" placement="top">
                                <IconButton ripple={true} color="green">
                                  <i className="fa-regular fa-pen-to-square"></i>
                                </IconButton>
                              </Tooltip>
                            </Typography>
                          </div>
                          <div className="justify-center">
                            <Tooltip content="Delete User" placement="top">
                              <IconButton color="red" onClick={() => handleDelete(_id)}>
                                <i className="fa-solid fa-trash"></i>
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Users;
