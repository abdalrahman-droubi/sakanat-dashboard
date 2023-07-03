import { Alert, Input } from '@material-tailwind/react'
import React from 'react'


export function Step({ setProviderData, providerData,error}) {
    const handleChange = (e) => {
        setProviderData({ ...providerData, [e.target.name]: e.target.value })
    }

    return (
        <div className="mx-auto my-10 w-96 flex flex-col items-center">
            <div className="max-w-screen-lg">
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold leading-tight text-gray-900 sm:text-4xl ">
                        Company Account
                    </h2>
                    <h3 className='text-lg'> name, email and password.</h3>
                </div>
                <form >
                    <Input
                        className="bg-white"
                        type="text"
                        size="lg"
                        label="Company Name"
                        name='companyName'
                        value={providerData.companyName}
                        onChange={handleChange}
                        pattern=''
                    />
                    {/* {error.companyName && (
                        <Alert color="red" variant="gradient">
                            <span className="">
                                {error.companyName}
                            </span>
                        </Alert>
                    )} */}
                    <br />
                    <Input
                        type="email"
                        size="lg"
                        label="Email"
                        name='email'
                        value={providerData.email}
                        onChange={handleChange}
                    />
                    {error && (
                        <Alert color="red" variant="gradient">
                            <span className="">
                                {error}
                            </span>
                        </Alert>
                    )}
                    <br />
                    <Input
                        type="text"
                        size="lg"
                        label="phone Number"
                        name='phoneNumber'
                        value={providerData.phoneNumber}
                        onChange={handleChange}
                    />
                    {/* {error && (
                        <Alert color="red" variant="gradient">
                            <span className="">
                                {error}
                            </span>
                        </Alert>
                    )} */}
                    <br />
                    <Input
                        type="password"
                        size="lg"
                        label="Password"
                        name='password'
                        value={providerData.password}
                        onChange={handleChange}
                    />
                    {/* {error.password && (
                        <Alert color="red" variant="gradient">
                            <span className="">
                                {error.password}
                            </span>
                        </Alert>
                    )} */}
                    <br />
                </form>
            </div >
        </div >
    )
}

export default Step