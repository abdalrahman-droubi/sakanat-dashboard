import { Link } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { Button, Stepper, Step, StepLabel } from "@material-tailwind/react";
// import { StepLabel } from "@material-tailwind/react/Stepper";

import Select from 'react-select'
import { useState } from "react";



const options = [
  { value: '0', label: 'pending' },
  { value: '1', label: 'approved' },

]
const steps = ['Step 1', 'Step 2', 'Step 3']; // Add your desired steps here

export function AddPitches() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <>
      {/* <div className="flex flex-col w-72 items-end gap-6 mx-auto my-20">
        <Input className="bg-white" type="text" size="lg" label="Pitch-Owner" />
        <Input type="text" size="lg" label="Pitch-Name" />
        <Input type="number" size="lg" label="Capacity" />
        <Input type="text" size="lg" label="Discription" />
        <Input type="file" accept="image/*" label="upload image" />

        <Select className="w-72" options={options} label=" State" />

        <Button className="w-72" color="green" ripple={true}>Add Pitch</Button>
      </div> */}
      <div>
        {/* <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper> */}

        <div>
          {activeStep === steps.length ? (
            <div>
              <p>All steps completed</p>
            </div>
          ) : (
            <div>
              {/* Render the form for each step */}
              {activeStep === 0 && <div>
                <h2>Step 1</h2>
                {/* Your form inputs for Step 1 */}
              </div>}
              {activeStep === 1 && <div>
                <h2>Step 2</h2>
                {/* Your form inputs for Step 2 */}
              </div>}
              {activeStep === 2 && <div>
                <h2>Step 3</h2>
                {/* Your form inputs for Step 3 */}
              </div>}

              {/* Navigation buttons */}
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
}
// // Step 1 component
// const Step1 = () => {
//   return (
    
//   );
// };

// // Step 2 component
// const Step2 = () => {
//   return (
  
//   );
// };

// // Step 3 component
// const Step3 = () => {
//   return (
    
//   );
// }
export default AddPitches;