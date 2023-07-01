import { Button } from "@material-tailwind/react";
import { useState } from "react";
import Step2 from "../../component/AddProvider/Step2";
import Step1 from "../../component/AddProvider/Step1";
import Step3 from "../../component/AddProvider/Step3";
import axios from "axios";


export function AddProvider() {
  const [activeStep, setActiveStep] = useState(0);
  const [providerData, setProviderData] = useState({
    companyName: "",
    email: "",
    password: "",
    city: "",
    serviceType: "",
    description: "",
    companyImage: [],
    services: [],
    workHours: ''
  });
  const [error, setError] = useState()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(providerData);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSubmit = () => {
    axios.post('http://localhost:5550/api/addProvider', providerData).then((res) => {
      console.log(res);
    }).catch((error) => {
      if (error.response.data.error === 'email already exists try another one') {
        setActiveStep(0)
        setError(error.response.data.error)
      }
      console.log(error);
    })
  }
  // const handleError = () => {
  //   setError(()=>{
  //     if (!providerData.companyName) {
  //       return {...error,companyName : "Company Name is required"}
  //     }
  //     if (!providerData.email) {
  //      return{ ...error,email : "Email is required"};
  //     } else if (!/\S+@\S+\.\S+/.test(providerData.email)) {
  //       return{ ...error,email : "Invalid email format"};
  //     }
  //     if (!providerData.password) {
  //       return{...error,password : "Password is required"}
  //     } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(providerData.password)) {
  //       return{...error,password : "Invalid password format"}
  //     }
  //   })   
  // };
  return (
    <>
      <div className="flex flex-col mt-5">
        <ul className="steps">
          <li className={activeStep <= 3 ? "step step-primary" : "step"}>Register</li>
          <li className={activeStep >= 1 ? "step step-primary" : "step"}>Company Details</li>
          <li className={activeStep >= 2 ? "step step-primary" : "step"}>Hours Work</li>
        </ul>
        <div className="flex flex-col mx-auto mb-10 w-full">
          {activeStep === 3 ? (
            <div className=" m-auto h-96 flex flex-col items-center justify-evenly">
              <p>All steps completed</p>
            </div>
          ) : (
            <div>
              {/* Render the form for each step */}
              {activeStep === 0 && <Step1 providerData={providerData} setProviderData={setProviderData} error={error} />}
              {activeStep === 1 && <Step2 providerData={providerData} setProviderData={setProviderData} />}
              {activeStep === 2 && <Step3 providerData={providerData} setProviderData={setProviderData} />}

              {/* Navigation buttons */}
              <div className="flex justify-around">
                <Button disabled={activeStep === 0} variant="gradient" color="green" ripple={true} onClick={handleBack}>
                  Back
                </Button>
                <Button variant="gradient" color="green" ripple={true} type="submit" onClick={() => {

                  activeStep === 2 ? handleSubmit() : handleNext()
                }
                }>
                  {activeStep === 2 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div >

    </>
  );
}
export default AddProvider;