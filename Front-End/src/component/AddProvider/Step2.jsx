import React, { useState } from 'react'
import { Button, Input, Option, Select, Textarea } from '@material-tailwind/react'

function Step2({ providerData, setProviderData, numInputStep2, setNumInputStep2 }) {

    const handleCityChange = (e) => {
        setProviderData((prevData) => ({
            ...prevData,
            city: e
        }));
    };

    const handleServiceTypeChange = (e) => {
        setProviderData((prevData) => ({
            ...prevData,
            serviceType: e
        }));
    };
    const handleDescriptionChange = (e) => {
        setProviderData((prevData) => ({
            ...prevData,
            description: e.target.value
        }));
    };

    const handleImageChange = (e) => {
        setProviderData((prevData) => ({
            ...prevData,
            companyImage: Array.from(e.target.files)
        }));
    };

    const handleServiceChange = (index, value) => {
        setProviderData((prevData) => {
            const updatedServices = [...prevData.services];
            updatedServices[index] = value;
            return {
                ...prevData,
                services: updatedServices
            };
        });
    };
    return (
        <div className="mx-auto my-10 w-auto flex flex-col items-center">
            <div className="max-w-screen-lg">
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold leading-tight text-gray-900 sm:text-4xl">
                        Company  Details
                    </h2>
                </div>
                <form >
                    <div className='flex gap-8'>
                        <Select
                            size="lg"
                            label="City"
                            onChange={(e) => handleCityChange(e)}
                            value={providerData.city ? providerData.city : null}>
                            <Option value='Amman'>Amman</Option>
                            <Option value='Zarqa'>Zarqa</Option>
                            <Option value='Irbid'>Irbid</Option>
                            <Option value='Balqa'>Balqa</Option>
                            <Option value='Mafraq'>Mafraq</Option>
                            <Option value='Jerash'>Jerash</Option>
                            <Option value='Madaba'>Madaba</Option>
                            <Option value='Karak'>Karak</Option>
                            <Option value='Tafilah'>Tafilah</Option>
                            <Option value="Ma'an">Ma'an</Option>
                            <Option value='Aqaba'>Aqaba</Option>
                            <Option value='Ajloun'>Ajloun</Option>
                        </Select>
                        <Select
                            size="lg"
                            label="Service Type"
                            onChange={(e) => handleServiceTypeChange(e)}
                            value={providerData.serviceType ? providerData.serviceType : null}>
                            <Option value='hostel'>hostel</Option>
                            <Option value='House Keeping'>House Keeping</Option>
                            <Option value='Dry Clean'>Dry Clean</Option>
                            <Option value='Maintenance'>Maintenance </Option>
                        </Select>
                    </div>
                    <br />
                    <div>
                        <Textarea
                            size='lg'
                            maxLength="100"
                            rows="4"
                            label='Describtion'
                            resize={true}
                            onChange={handleDescriptionChange}
                            value={providerData.description} />
                        <p className="text-sm text-black ">**Character limit: 100</p>
                    </div>
                    <br />
                    <Input
                        type='file'
                        accept="image/*"
                        multiple
                        label='Company Image'
                        size='lg'
                        onChange={handleImageChange} />
                    <br />
                    <Input
                        type="number"
                        onChange={(e) => setNumInputStep2(Number(e.target.value))}
                        min={0}
                        max={15}
                        label="Number of Services"
                        value={numInputStep2 === 0 ? null : numInputStep2} />
                    <br />
                    <div className='flex gap-5 flex-wrap ' style={{ width: "500px" }}>
                        {[...Array(numInputStep2)].map((ele, index) => (
                            <div className='w-fit' key={index}>
                                <Input 
                                key={index} 
                                label={`Service ${index + 1}`} 
                                size="md" 
                                value={providerData.services[index] || ''} 
                                onChange={(e) => handleServiceChange(index, e.target.value)} />
                            </div>
                        ))}
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Step2