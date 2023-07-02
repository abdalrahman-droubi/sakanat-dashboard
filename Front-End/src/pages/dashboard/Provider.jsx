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
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export function Provider() {
  const [Providers, setProviders] = useState([])
  const [pitches, setPitches] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8181/getpitchwithuser")
      .then((response) => {
        const fetchedPitches = response.data;
        const sortedPitches = fetchedPitches.sort((a, b) => a.id - b.id);
        setPitches(sortedPitches);
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  }, []);

  console.log(pitches);


  useEffect(() => {
    axios.get('http://localhost:5550/api/getProvider/active').then((response) => {

      setProviders(response.data);
    }).catch((error) => {
      console.error('Error fetching providers data:', error);
    })
  }, []);

  const handleEditClick = async (id, STATE) => {
    const value = STATE ? true : false;
    if (!STATE) {
      const confirmed = await showConfirmationPrompt();

      if (!confirmed) {
        return;
      }
    }

    axios
      .put(`http://localhost:8181/pitch/${id}/${value}`)
      .then((response) => {
        console.log(response.data);
        setIsDeleted(!isDeleted);
      })
      .catch((error) => {
        console.error(error);

      });

    console.log(`Edit clicked for pitch ID: ${id}`);
  };
  const showConfirmationPrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to DELETE this field?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 ">
      <Card>
        <CardHeader variant="gradient" color="green" className="mb-8 p-6">
          <div className="grid grid-cols-6 justify-end gap-x-8">
            <Typography variant="h6" color="white">
              Providers Cards
            </Typography>
          </div>
        </CardHeader>

        <CardBody className=" px-0 pt-0 pb-2">
          {/* <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Id",
                  "Company Name",
                  "field_name",
                  "Location",
                  "field_size",
                  "Price",
                  "State",
                  "Action",
                  
                ].map((el) => (
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
              {pitches.map(
                (
                  { id, user_name, name, location, size, price, deleted },
                  key
                ) => {
                  const className = `py-3 px-5  ${
                    key === PitchesData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;
                  return (
                    <tr key={id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {id}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {user_name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {location}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {size}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="ml-2 text-xs font-semibold text-blue-gray-600">
                          {price}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold  text-blue-gray-600">
                          {deleted ? "APPROVED" : "NOT APPROVED"}
                        </Typography>
                      </td>

                      <td className={className}>
                        <div className="grid grid-cols-2 justify-center gap-2">
                          <div className="justify-center">
                            <IconButton
                              className="mr-4 xl:mr-0"
                              color="green"
                              onClick={() => handleEditClick(id, true)}
                            >
                              <i className="fa-regular fa-pen-to-square"></i>
                            </IconButton>
                          </div>
                          <div className="justify-center">
                            <IconButton
                              onClick={() => handleEditClick(id, false)}
                              
                              color="red"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </IconButton>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table> */}
          {Providers.map((provider) => {
            return (<section className="" key={provider._id}>
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
                    <div className="flex flex-col md:flex-row md:items-end gap-1 mt-3">
                      <strong className="font-sans text-base">services: </strong>
                      {provider.services.map((ele, index) => (
                        <Chip className="h-7" size="sm" color="green" value={`${ele}`} key={index} />
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
                          {Object.entries(provider.workHours).slice(0,7).map(([day, { start, end }]) => (
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
                    <div className="mt-8 flex justify-end sm:flex-row">
                      <div className="grid grid-cols-2 gap-2 justify-center">
                        <div className="justify-center" onClick={() => handleUpdate(_id, role)}>
                          <Typography className="text-xs font-semibold text-blue-gray-600 justify-center">
                            <Tooltip content="Edit Provider" placement="top">
                              <IconButton ripple={true} color="green">
                                <i className="fa-regular fa-pen-to-square"></i>
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </div>
                        <div className="justify-center">
                          <Tooltip content="Delete Provider" placement="top">
                            <IconButton color="red" onClick={() => handleDelete(_id)}>
                              <i className="fa-solid fa-trash"></i>
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            )
          })}
        </CardBody>
      </Card>
    </div>
  );
}

export default Provider;