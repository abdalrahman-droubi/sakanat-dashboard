import { UserDataContext } from '@/context/userDataContext';
import { CardBody, CardHeader, Tooltip, Typography, Card, IconButton } from '@material-tailwind/react';
import axios from 'axios';
import { Button } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Loader from '../loader'
export default function ServicesInprogres() {
    const { user } = useContext(UserDataContext)
    const [servicesRequest, setServicesRequest] = useState([])
    const [FilterData, setFilterData] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:5550/api/getRequestServices/inprogres/${user._id}`).then((response) => {
            setServicesRequest(response.data);
            setFilterData(response.data)
            console.log(response);
        }).catch((error) => {
            console.error('Error fetching RequestedServices data:', error);
        })
    }, [user, refresh]);


    const handlerequest = async (id, type) => {
        console.log(id, type);
        const confirmed = await showConfirmationPrompt(type);
        if (confirmed) {
            axios.put(`http://localhost:5550/api/updateRequestStatus/${type}/${id}`).then((res) => {
                console.log(res);
                setRefresh(!refresh)
            })
                .catch((error) => {
                    console.error('Error delete users :', error);
                })
        }
    };

    const showConfirmationPrompt = (type) => {
        return new Promise((resolve) => {
            Swal.fire({
                title: `Are you sure you want to ${type} this request?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: `Yes, ${type} it!`,
            }).then((result) => {
                resolve(result.isConfirmed);
            });
        });
    };


    const handleSearch = (Searchede) => {
        const filteredData = servicesRequest.filter((item) => item._id.toLowerCase().includes(Searchede.toLowerCase())
            || item.location.toLowerCase().includes(Searchede.toLowerCase())
            || item.phoneNumber.toLowerCase().includes(Searchede.toLowerCase())
            || item.user.fullName.toLowerCase().includes(Searchede.toLowerCase())
        );
        setFilterData(filteredData)

    };
    return (
        // servicesRequest.length !== 0 ?
        <div className="mt-28 mb-8 flex flex-col gap-12 ">
            <Card>
                <CardHeader variant="gradient" color="blue-gray" className="mb-8 p-6 bg-[#191a3e]">
                    <div className="grid grid-cols-1 sm:grid-cols-2  gap-x-2">
                        <Typography variant="h6" color="white">
                        Services in progres Cards
                        </Typography>
                        <form>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-black">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    className="block w-full p-4 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="request id ,client name , clientphone number , location"
                                    required
                                    onChange={(e) => {
                                        handleSearch(e.target.value)
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </CardHeader>
                <CardBody className=" overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["ID", "Client Name", "Client Email", "Client Phone number", "service type","Details", 'Location', "Delivered on", "Requested on", "Action"].map((el) => (
                                    <th
                                        key={el}
                                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                    >
                                        <Typography
                                            variant="small"
                                            className="text-[11px] font-bold uppercase text-black"
                                        >
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {FilterData.map((request, key) => {
                                return (
                                    <tr key={request._id}>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <Typography className="text-xs font-semibold text-blue-gray-500">
                                                        {request._id}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Typography className="text-xs font-semibold text-blue-gray-500">
                                                {request.user.fullName}
                                            </Typography>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Typography className="text-xs font-semibold text-blue-gray-500">
                                                {request.email}
                                            </Typography>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Typography className="text-xs font-semibold text-blue-gray-500">
                                                {request.phoneNumber}
                                            </Typography>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Typography className="text-xs font-semibold text-blue-gray-500">
                                                {request.serviceType.name}
                                            </Typography>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Typography className="text-xs font-semibold text-blue-gray-500">
                                                {request.details}
                                            </Typography>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Typography className="text-xs font-semibold text-blue-gray-500">
                                                {request.location}
                                            </Typography>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Typography className="text-xs font-semibold text-blue-gray-500">
                                                {new Date(request.dateTime).toLocaleString()}
                                            </Typography>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Typography className="text-xs font-semibold text-blue-gray-500">
                                                {new Date(request.createdAt).toLocaleString()}
                                            </Typography>
                                        </td>
                                        <td className="text-xs font-semibold text-blue-gray-500">
                                            <div className="flex justify-end sm:flex-row">
                                                <div className="grid grid-cols-2 gap-4 justify-center">
                                                    <div className="justify-center" onClick={() => handlerequest(request._id, "completed")}>
                                                        <Typography className="text-xs font-semibold text-blue-gray-600 justify-center">
                                                            <Tooltip content="completing" placement="top">
                                                                <IconButton color="green" variant="gradient">
                                                                    <i class="fa-solid fa-circle-check" ></i>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Typography>
                                                    </div>
                                                    <div className="justify-center" onClick={() => handlerequest(request._id, "reject")}>
                                                        <Tooltip content="reject" placement="top">
                                                            <IconButton color="red" >
                                                                <i class="fa-solid fa-circle-xmark"></i>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
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
        // :<Loader />
    )
}
