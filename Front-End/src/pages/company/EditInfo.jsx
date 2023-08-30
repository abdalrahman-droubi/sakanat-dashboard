import React, { useContext, useEffect, useState } from 'react'
import Loader from '../loader'
import { UserDataContext } from '@/context/userDataContext'
import axios from 'axios'


function EditInfo() {
    const { user } = useContext(UserDataContext)
    const [AccountData, setAccountData] = useState({
        companyName: user?.companyName,
        password: "",
        newPassword: ""
    })
    const [infoData, setinfoData] = useState({
        city: user?.city,
        password: "",
        newPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [errors, setErrors] = useState();

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

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:5550/api/updateProviderAccount/${user._id}`, AccountData)
            .then((response) => {
                console.log('Data updated successfully:', response.data);
                setErrors()
            })
            .catch((error) => {
                console.error('Error updating data:', error);
                console.log(error.response.data.error);
                setErrors(error.response.data.error)
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
                        <form>
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
                                        htmlFor="emailAddress"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="emailAddress"
                                        type="email"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-gray-700 dark:text-gray-200"
                                        htmlFor="passwordConfirmation"
                                    >
                                        Password Confirmation
                                    </label>
                                    <input
                                        id="passwordConfirmation"
                                        type="password"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-gray-700 dark:text-gray-200"
                                        htmlFor="passwordConfirmation"
                                    >
                                        Color
                                    </label>
                                    <input
                                        id="color"
                                        type="color"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-gray-700 dark:text-gray-200"
                                        htmlFor="passwordConfirmation"
                                    >
                                        Select
                                    </label>
                                    <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                        <option>Surabaya</option>
                                        <option>Jakarta</option>
                                        <option>Tangerang</option>
                                        <option>Bandung</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        className="text-gray-700 dark:text-gray-200"
                                        htmlFor="passwordConfirmation"
                                    >
                                        Range
                                    </label>
                                    <input
                                        id="range"
                                        type="range"
                                        className="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-gray-700 dark:text-gray-200"
                                        htmlFor="passwordConfirmation"
                                    >
                                        Date
                                    </label>
                                    <input
                                        id="date"
                                        type="date"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-gray-700 dark:text-gray-200"
                                        htmlFor="passwordConfirmation"
                                    >
                                        Text Area
                                    </label>
                                    <textarea
                                        id="textarea"
                                        type="textarea"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        defaultValue={""}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Image</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-700"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                    <span className="">Upload a file</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1 text-gray-700">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-700">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-600">
                                    Save
                                </button>
                            </div>
                        </form>
                    </section>

                </>

                : <Loader />}
        </>
    )
}

export default EditInfo