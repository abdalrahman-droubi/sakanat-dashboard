import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
  Radio,
} from "@material-tailwind/react";
import axios from "axios";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post('http://localhost:5550/api/auth', formData)
    .then((res)=>{
console.log(res);
    })
    // Add your logic to handle form submission
  };

  return (
    <>
      {/* <img
        src="https://media.istockphoto.com/id/538489900/photo/soccer-football-stadium-with-floodlights.jpg?s=612x612&w=0&k=20&c=qdExKdPyOirWjW8mb854vaAglX1IhmonkbGYbqJOUyU="
        className="absolute inset-0 z-0 h-full w-full object-cover"
      /> */}
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit}>
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
              variant="gradient"
              color="green"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign In
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                type="email"
                name="email"
                label="Email"
                size="lg"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                type="password"
                name="password"
                label="Password"
                size="lg"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="flex justify-around">
                <Radio
                  id="html"
                  name="role"
                  label="provider"
                  value="provider"
                  onChange={handleChange}
                />
                <Radio
                  id="react"
                  name="role"
                  label="admin"
                  value="admin"
                  onChange={handleChange}
                />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" color="green" fullWidth type="submit">
                Sign In
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}

export default SignIn;
