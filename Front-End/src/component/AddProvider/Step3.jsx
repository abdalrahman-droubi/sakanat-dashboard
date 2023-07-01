import { Button, Option, Select } from '@material-tailwind/react';
import React, { useState } from 'react'

function Step3({ providerData, setProviderData }) {
    const [workHours, setWorkHours] = useState({
        Monday: { start: "", end: "" },
        Tuesday: { start: "", end: "" },
        Wednesday: { start: "", end: "" },
        Thursday: { start: "", end: "" },
        Friday: { start: "", end: "" },
        Saturday: { start: "", end: "" },
        Sunday: { start: "", end: "" },
    });

    const handleChange = (day, field, value) => {
        setWorkHours((prevWorkHours) => ({
            ...prevWorkHours,
            [day]: {
                ...prevWorkHours[day],
                [field]: value,
            },
        }));
        setProviderData((prevData) => ({
            ...prevData,
            workHours: workHours,
          }));
    };
    const hoursOptions = [
        { value: "", label: "Close" },
        ...Array.from({ length: 24 }, (_, i) => ({
          value: i.toString().padStart(2, "0") + ":00",
          label: i.toString().padStart(2, "0") + ":00",
        })),
      ];
    return (
        <div className="mx-auto my-10 w-auto flex flex-col items-center">
            <div className="max-w-screen-lg">
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold leading-tight text-gray-900 sm:text-4xl">
                        Hours Work
                    </h2>
                </div>
                <form  className="space-y-4">
                    <div className="space-y-2">
                        {Object.entries(workHours).map(([day, { start, end }]) => (
                            <div key={day}>
                                <h3 className="text-lg text-black">{day}</h3>
                                <div className="space-x-2 flex">
                                    <Select
                                        value={start}
                                        onChange={(value) => handleChange(day, "start", value)}
                                        label='Start'
                                        size='lg'
                                        className='w-72'
                                    >
                                        {hoursOptions.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Select
                                        value={end}
                                        onChange={(value) => handleChange(day, "end", value)}
                                        label='End'
                                        size='lg'
                                        className='w-72'
                                    >
                                        {hoursOptions.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Step3