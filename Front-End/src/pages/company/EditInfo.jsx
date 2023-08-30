import React, { useContext, useEffect, useState } from 'react'
import Loader from '../loader'
import { UserDataContext } from '@/context/userDataContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";


function EditInfo() {
    const { user } = useContext(UserDataContext)
    const Navigate = useNavigate()
    const [AccountData, setAccountData] = useState({
        companyName: user?.companyName,
        password: "",
        newPassword: ""
    })
    const [infoData, setinfoData] = useState({
        city: user?.city,
        serviceType: user?.serviceType,
        description: user?.description,
        phoneNumber: `0${user?.phoneNumber}`,
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [errors, setErrors] = useState();
    const [editedServices, setEditedServices] = useState([...user?.services]);
    const [scheduleData, setScheduleData] = useState(user?.workHours);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAccountData((prevProvider) => ({
            ...prevProvider,
            [name]: value,
        }));
    };
    const handleInputChangeInfo = (event) => {
        const { name, value } = event.target;
        setinfoData((prevProvider) => ({
            ...prevProvider,
            [name]: value,
        }));
    };

    const handleServiceChange = (event, index, field) => {
        const newValue = event.target.value;
        setEditedServices((prevServices) => {
            const updatedServices = [...prevServices];
            updatedServices[index][field] = newValue;
            return updatedServices;
        });
    };

    const handleWorkHouersChange = (day, field, value) => {
        setScheduleData((prevSchedule) => ({
            ...prevSchedule,
            [day]: {
                ...prevSchedule[day],
                [field]: value,
            },
        }));
        console.log(scheduleData);
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:5550/api/updateProviderAccount/${user._id}`, AccountData)
            .then((response) => {
                console.log('Data updated successfully:', response.data);
                setErrors()
                Swal.fire('Update successfully')
                Navigate("/company/home")
            })
            .catch((error) => {
                console.error('Error updating data:', error);
                console.log(error.response.data.error);
                setErrors(error.response.data.error)
            });
    };
    const handleinfoDataSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:5550/api/updateProviderinfoData/${user._id}`, infoData)
            .then((response) => {
                console.log('Data updated successfully:', response.data);
                Swal.fire('Update successfully')
                Navigate("/company/home")
            })
            .catch((error) => {
                console.error('Error updating data:', error);
            });
    };

    const handleEditedServicesSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:5550/api/updateServicesData/${user._id}`, { services: editedServices })
            .then((response) => {
                console.log('Services updated successfully:', response.data);
                Swal.fire('Update successfully')
                Navigate("/company/home")
            })
            .catch((error) => {
                console.error('Error updating services:', error);
            });
    };

    const handleWorkHoursSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:5550/api/updateSchedule/${user._id}`, { schedule: scheduleData })
            .then((response) => {
                console.log('Schedule updated successfully:', response.data);
                Swal.fire('Update successfully')
                Navigate("/company/home")
            })
            .catch((error) => {
                console.error('Error updating schedule:', error);
            });
    };
    return (
        <>
            {user ?
                <>
                    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-2xl dark:bg-gray-800 mt-20">
                        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                            Account settings
                        </h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        className="text-gray-700 dark:text-gray-200"
                                        htmlFor="username"
                                    >
                                        Company Name*
                                    </label>
                                    <input
                                        name="companyName"
                                        onChange={handleInputChange}
                                        value={AccountData.companyName}
                                        id="username"
                                        type="text"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-gray-700 dark:text-gray-200"
                                        htmlFor="emailAddress"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        value={user.email}
                                        readOnly
                                        id="emailAddress"
                                        type="email"
                                        className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-gray-700 dark:text-gray-200"
                                        htmlFor="password"
                                    >
                                        Password*
                                    </label>
                                    <div className="relative">
                                        <input
                                            name='password'
                                            onChange={handleInputChange}
                                            value={AccountData?.password}
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 dark:text-gray-300 cursor-pointer"
                                        >
                                            {showPassword ? (
                                                <i class="fa-solid fa-eye"></i>
                                            ) : (
                                                <i class="fa-solid fa-eye-slash"></i>
                                            )}
                                        </button>
                                    </div>
                                    <p className='text-red-700'>{errors}</p>
                                </div>
                                <div>
                                    <label
                                        className="text-gray-700 dark:text-gray-200"
                                        htmlFor="newPassword"
                                    >
                                        New Password*
                                    </label>
                                    <div className="relative">
                                        <input
                                            name='newPassword'
                                            onChange={handleInputChange}
                                            value={AccountData?.newPassword || ''}
                                            id="newPassword"
                                            type={showNewPassword ? 'text' : 'password'}
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        />
                                        <button
                                            type="button"
                                            onClick={toggleNewPasswordVisibility}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 dark:text-gray-300 cursor-pointer"
                                        >
                                            {showNewPassword ? (
                                                <i class="fa-solid fa-eye"></i>
                                            ) : (
                                                <i class="fa-solid fa-eye-slash"></i>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                    type='submit'>
                                    Save
                                </button>
                            </div>
                        </form>
                    </section>
                    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-2xl dark:bg-gray-800 mt-20">
                        <h1 className="text-xl font-bold text-gray-700 capitalize dark:text-white">
                            info settings
                        </h1>
                        <form onSubmit={handleinfoDataSubmit}>
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        className="text-gray-700 dark:text-gray-200"
                                        htmlFor="passwordConfirmation"
                                    >
                                        City
                                    </label>
                                    <select
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        value={infoData.city}
                                        onChange={handleInputChangeInfo}
                                        name='city'
                                    >
                                        <option value='Zarqa'>Zarqa</option>
                                        <option value='Amman'>Amman</option>
                                        <option value='Irbid'>Irbid</option>
                                        <option value='Balqa'>Balqa</option>
                                        <option value='Mafraq'>Mafraq</option>
                                        <option value='Jerash'>Jerash</option>
                                        <option value='Madaba'>Madaba</option>
                                        <option value='Karak'>Karak</option>
                                        <option value='Tafilah'>Tafilah</option>
                                        <option value="Ma'an">Ma'an</option>
                                        <option value='Aqaba'>Aqaba</option>
                                        <option value='Ajloun'>Ajloun</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        className="text-gray-700 dark:text-gray-200"
                                        htmlFor="passwordConfirmation"
                                    >
                                        Service Type
                                    </label>
                                    <select
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        value={infoData.serviceType}
                                        onChange={handleInputChangeInfo}
                                        name='serviceType'
                                    >
                                        <option value='Hostel'>Hostel</option>
                                        <option value='House Keeping'>House Keeping</option>
                                        <option value='Dry Clean'>Dry Clean</option>
                                        <option value='Maintenance'>Maintenance </option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        className="text-gray-700 dark:text-gray-200"
                                        htmlFor="passwordConfirmation"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        maxLength="300"
                                        id="textarea"
                                        type="textarea"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        value={infoData.description}
                                        onChange={handleInputChangeInfo}
                                        name='description'
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="number">
                                        Phone Number
                                    </label>
                                    <input
                                        id="number"
                                        type="number"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        value={infoData.phoneNumber}
                                        onChange={handleInputChangeInfo}
                                        name='phoneNumber'
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-600"
                                    type='submit'
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </section>
                    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-2xl dark:bg-gray-800 mt-20">
                        <h1 className="text-xl font-bold text-gray-700 capitalize dark:text-white">
                            Services settings
                        </h1>
                        <form onSubmit={handleEditedServicesSubmit}>
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                {user?.services.map((ele, index) =>
                                    <>
                                        <div>
                                            <label
                                                className="text-gray-700 dark:text-gray-200"
                                                htmlFor="name"
                                            >
                                                Service Name {index + 1}
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                value={editedServices[index]?.name}
                                                onChange={(event) => handleServiceChange(event, index, 'name')}
                                                name='name'
                                            />

                                        </div>
                                        <div>
                                            <label
                                                className="text-gray-700 dark:text-gray-200"
                                                htmlFor="price"
                                            >
                                                Service Price {index + 1}
                                            </label>
                                            <input
                                                id="price"
                                                type="number"
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                value={editedServices[index]?.price}
                                                onChange={(event) => handleServiceChange(event, index, 'price')}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-600"

                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </section>
                    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-2xl dark:bg-gray-800 mt-20">
                        <h1 className="text-xl font-bold text-gray-700 capitalize dark:text-white">
                            work Hours settings
                        </h1>
                        <form onSubmit={handleWorkHoursSubmit}>
                            {scheduleData &&
                                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                    {Object.keys(scheduleData).slice(0, 7).map((day) => (
                                        <div key={day}>
                                            <h3>{day}</h3>
                                            <div>
                                                <label className="text-gray-700 dark:text-gray-200">
                                                    Start:
                                                    <input
                                                        type="text"
                                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                        value={scheduleData[day].start}
                                                        onChange={(e) => handleWorkHouersChange(day, 'start', e.target.value)}
                                                    />
                                                </label>
                                            </div>
                                            <div>
                                                <label className="text-gray-700 dark:text-gray-200">
                                                    End:
                                                    <input
                                                        type="text"
                                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                        value={scheduleData[day].end}
                                                        onChange={(e) => handleWorkHouersChange(day, 'end', e.target.value)}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            <div className="flex justify-end mt-6">
                                <button
                                    className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-600"

                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </section>

                </>

                : <Loader />
            }
        </>
    )
}

export default EditInfo