import { UserDataContext } from '@/context/userDataContext';
import { Chip, Dialog, DialogBody, DialogHeader, IconButton, Typography, Card } from '@material-tailwind/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Loader from '../loader'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './styles.css';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const TABLE_HEAD = ["Day", "Start Time", "End Time"];
const TABLE_HEAD1 = ["Num", "Name", "Price"];


function CompanyDetails() {
  const { user } = useContext(UserDataContext)
  const [id, setid] = useState(user._id)
  const [provider, setProvider] = useState()
  const [numRequest, setnumRequest] = useState()
  useEffect(() => {
    axios.get(`http://localhost:5550/api/getOneProvider/${user._id}`).then((response) => {
      console.log(response.data);
      setProvider(response.data.oneProvider)
      setnumRequest({
        completed: response.data.completed,
        inprogress: response.data.inprogress,
        pending: response.data.pending,
        rejected: response.data.rejected
      })
    }).catch((error) => {
      console.error('Error fetching providers data:', error);
    })
  }, [id, user._id]);
  return (
    <>
      {provider ?
        <main className="profile-page mt-80">
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          src={`http://localhost:5550/${provider?.companyImage[0]}`}
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <Link to={"/company/editInfo"}>
                        <button
                          className="bg-pink-500 active:bg-pink-600 text-white font-bold hover:shadow-md shadow  px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Edit info
                        </button>
                        </Link>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-1 p-3 text-center">
                          <span className="text-lg font-bold block uppercase tracking-wide text-blueGray-600">
                            {numRequest?.completed}
                          </span>
                          <span className="text-sm text-blueGray-400">Request <span className='text-green-700'>completed</span> </span>
                        </div>
                        <div className="mr-1 py-3 text-center">
                          <span className="text-lg font-bold block uppercase tracking-wide text-blueGray-600">
                          {numRequest?.inprogress}
                          </span>
                          <span className="text-sm text-blueGray-400">Request <span className='text-blue-700'>inprogress</span></span>
                        </div>
                        <div className="lg:mr-1 p-3 text-center">
                          <span className="text-lg font-bold block uppercase tracking-wide text-blueGray-600">
                            {numRequest.pending}
                          </span>
                          <span className="text-sm text-blueGray-400">Request <span className='text-yellow-700'>pending</span> </span>
                        </div>
                        <div className="lg:mr-1 p-3 text-center">
                          <span className="text-lg font-bold block uppercase tracking-wide text-blueGray-600">
                            {numRequest.rejected}
                          </span>
                          <span className="text-sm text-blueGray-400">Request <span className='text-red-700'>rejected</span> </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-14">
                    <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                      {provider?.companyName}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                      {provider?.city}
                    </div>
                    <div className=" leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" />
                      {provider?.serviceType}
                    </div>
                    <div className="leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                      <i class="fa-solid fa-phone mr-2 text-lg text-blueGray-400"></i>
                      0{provider?.phoneNumber}
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          {provider?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 lg:order-1">
                    <div className="flex justify-center flex-wrap md:flex-nowrap py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 w-full">
                        <h1 className=' pb-2 text-xl text-center text-black'>Work Hours</h1>
                        <Card className="h-auto w-full overflow-y-hidden">
                          <table className="w-full min-w-max table-auto text-left">
                            <thead>
                              <tr>
                                {TABLE_HEAD.map((head) => (
                                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal leading-none opacity-70"
                                    >
                                      {head}
                                    </Typography>
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(provider?.workHours).slice(0, 7).map(([day, { start, end }], index) => (
                                <tr key={day} className={`even:bg-blue-gray-50/50 ${index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}`}>
                                  <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                      {day}
                                    </Typography>
                                  </td>
                                  <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                      {start || "-"}
                                    </Typography>
                                  </td>
                                  <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                      {end || "-"}
                                    </Typography>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </Card>
                      </div>
                      <div className="mr-4 p-3 text-center w-full">
                        <h1 className=' pb-2 text-xl text-black'>Company Services</h1>
                        <Card className="h-auto w-full overflow-y-hidden">
                          <table className="w-full min-w-max table-auto text-left">
                            <thead>
                              <tr>
                                {TABLE_HEAD1.map((head) => (
                                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal leading-none opacity-70"
                                    >
                                      {head}
                                    </Typography>
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {provider?.services.map(({ name, price, _id }, index) => (
                                <tr key={_id} className={`even:bg-blue-gray-50/50 ${index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}`}>
                                  <td className="p-4">
                                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                      {index + 1}
                                    </Typography>
                                  </td>
                                  <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                      {name}
                                    </Typography>
                                  </td>
                                  <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                      {price}
                                    </Typography>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </Card>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 lg:order-1">
                    <div className="flex justify-center flex-wrap md:flex-nowrap py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 w-1/2">
                        <Swiper
                          pagination={{
                            type: 'fraction',
                          }}
                          navigation={true}
                          modules={[Pagination, Navigation]}
                          className="mySwiper"
                        >
                          {provider?.companyImage?.map((imagePath) =>
                            <SwiperSlide>
                              <img
                                src={`http://localhost:5550/${imagePath}`}
                                alt=""
                                style={{ height: "400px" }}
                              />
                            </SwiperSlide>
                          )}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        : <Loader />}
    </>
  )
}

export default CompanyDetails