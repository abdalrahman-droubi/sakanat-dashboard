import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Tooltip,
    IconButton
} from "@material-tailwind/react";
import Swal from "sweetalert2";


function DeletedProviders() {
    const [ProvidersData, setProvidersData] = useState([]);  // State to store users data
    const [Refresh, setRefresh] = useState(true);   // State to run useEffect that get users data


    // Fetch users data from the server
    useEffect(() => {
        axios.get('http://localhost:5550/api/getProvider/notactive').then((response) => {
            setProvidersData(response.data);
        }).catch((error) => {
            console.error('Error fetching users data:', error);
        })
    }, [Refresh]);


    // update user role to admin 
    const handleRetrieve = (id) => {
        Swal.fire({
            title: "Are you sure want to Retrieve User?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:5550/api/RetrieveProvider/${id}`)
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
    };


    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="green" className="mb-8 p-6">
                    <div className="grid grid-cols-3 gap-x-8 justify-end">
                        <Typography variant="h6" color="white">
                            Deleted Provider Table
                        </Typography>
                    </div>
                </CardHeader>

                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["ID", "Name", "Email", "city", 'service Type', "Action"].map((el) => (
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
                            {ProvidersData
                                .map(({ _id, companyName, email, city, serviceType }, key) => {
                                    const className = `py-3 px-5 border-b border-blue-gray-50
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
                                                    {companyName}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {email}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {city}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {serviceType}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <div className="justify-center" onClick={() => handleRetrieve(_id)}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600 justify-center">
                                                        <Tooltip content="Retrieve" placement="top">
                                                            <IconButton ripple={true} color="green">
                                                                <i class="fa-solid fa-arrow-rotate-left"></i>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Typography>
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
    )
}

export default DeletedProviders