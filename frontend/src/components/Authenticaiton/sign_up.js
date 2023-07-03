import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [show, setShow] = useState(false);
  // const [name, setName] = useState();
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  // const [conformpassword, setconformpassword] = useState();
  const [pic, setpic] = useState();
  const [Loading, setLoading] = useState(false);
  const toast = useToast();
  const Navigate = useNavigate();
  const { name, conformpassword, password, email } = useRef();


  const handleClick = () => {
    setShow(!show);
  };
  const handleclick = () => {
    setShow(!show);
  };
  const postDetails = async (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please Select an Image ",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/png" ||
      pic.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pic);

      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dxch6op9s");
      data.append("file", pic);
      // data.append("upload_preset", "chat-app");
      // data.append("cloud_name", "dxch6op9s");

      await fetch("https://api.cloudinary.com/v1_1/dxch6op9s/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          console.log(data.url.toString());
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err); 
          setLoading(false);
        });
      console.log(data);
    } else {
      toast({
        title: "Please Select an Image ",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    let pass = password.current.value.trim();
    let mail = email.current.value.trim();
    let Nam = name.current.value.trim();
    let cpass = conformpassword.current.value.trim();
    if (!Nam || !mail || !pass || !cpass) {
      toast({
        title: "Please fill  all field  ",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (pass !== cpass) {
      toast({
        title: "Password dosen't  match ",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let { data } = await axios.post(
        "/api/user",
        { name: Nam, email: mail, password: pass, pic },
        config
      );
      toast({
        title: "Regestration successfull ",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      Navigate("/chat");
    } catch (error) {
      toast({
        title: "Error occured ",
        status: "warning",
        description: error.response.data.message,
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing={"5px"} color={"black"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          // onChange={(e) => setName(e.target.value)}
          ref={name}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          // onChange={(e) => setEmail(e.target.value)}
          ref={email}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your password"
            // onChange={(e) => setPassword(e.target.value)}
            ref={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            // onChange={(e) => setconformpassword(e.target.value)}
            ref={conformpassword}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleclick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={Loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
