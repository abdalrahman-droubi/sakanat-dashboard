import React from 'react'
import {
    Chip,
    Dialog,
    DialogHeader,
    DialogBody,
    Typography,
    IconButton,
} from '@material-tailwind/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
function Details({ handleOpen, setOpen, open, provider }) {
    return (
        <>
            {provider && <Dialog open={open} handler={handleOpen} size='xl'>
                <DialogHeader className="justify-between">
                    <Typography className="font-bold text-lg">{provider.companyName} details </Typography>
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                    >
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </DialogHeader>
                <DialogBody divider className="h-[40rem] overflow-scroll ">
                    <section className="w-auto">
                        <div className="items-end mx-auto my-5 max-w-screen-lg rounded-md border border-gray-300 text-blue-gray-600 shadow-md">
                            <div className="relative flex h-full flex-col text-blue-gray-600 md:flex-row">
                                <div className=" w-1/3 flex items-start  pt-1 md:p-4">
                                    <img
                                        className="block h-1/2 max-w-full w-full rounded-md shadow-lg"
                                        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                                        alt="Shop image"
                                    />
                                </div>
                                <div className="relative p-6 md:w-4/6">
                                    <div className="flex sm:flex-row flex-col-reverse justify-between items-start">
                                        <h2 className="mb-3 text-lg font-black">Name: {provider.companyName}</h2>
                                        <Chip className="h-7" size="sm" color="green" value={`id : ${provider._id}`} />
                                    </div>
                                    <div className="flex flex-col justify-between items-start">
                                        <h2 className="mb-1 text-lg font-black">Email: {provider.email}</h2>
                                        <h2 className="mb-1 text-lg font-black">City: {provider.city}</h2>
                                        <h2 className=" text-lg font-black">Service type: {provider.serviceType}</h2>
                                    </div>
                                    <p className="mt-3 font-sans text-base tracking-normal break-words">
                                        <strong>Description: </strong>{provider.description}
                                    </p>
                                    <div className="flex flex-col flex-wrap md:flex-row md:items-end gap-1 mt-3">
                                        <strong className="font-sans text-base">services: </strong>
                                        {provider.services.map((ele, index) => (
                                            <Chip className="h-7 w- lg:w-fit" size="sm" color="green" value={`${ele}`} key={index} />
                                        ))}
                                    </div>
                                    <div className="mt-5">
                                        <strong>work Hours Table : </strong>
                                        <table className="w-full min-w-max table-auto text-left">
                                            <thead>
                                                <tr>
                                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal leading-none opacity-70"
                                                        >
                                                            Day
                                                        </Typography>
                                                    </th>
                                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal leading-none opacity-70"
                                                        >
                                                            Start
                                                        </Typography>
                                                    </th>
                                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal leading-none opacity-70"
                                                        >
                                                            End
                                                        </Typography>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(provider.workHours).slice(0, 7).map(([day, { start, end }]) => (
                                                    <tr key={day} className="even:bg-blue-gray-50/50">
                                                        <td className="p-4">
                                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                                {day}
                                                            </Typography>
                                                        </td>
                                                        <td className="p-4">
                                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                                {start}
                                                            </Typography>
                                                        </td>
                                                        <td className="p-4">
                                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                                {end}
                                                            </Typography>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </DialogBody>
            </Dialog>}
        </>
    )
}

export default Details