import React, { useRef, useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [show, setShow] = useState(false);
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();`      

  const [Loading, setLoading] = useState(false);
  const toast = useToast();
  const Navigate = useNavigate();
  const handleClick = () => {
    setShow(!show);
  };

  const email = useRef();
  const password = useRef();
  console.log("hellp");

  const submitHandler = async (e) => {
    let pass = password.current.value.trim()
    let mail =email.current.value.trim()
    setLoading(true);
    if (!mail || !pass) {
      toast({
        title: "Please fill  all field ",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        }, 
      };
      let { data } = await axios.post(
        "api/user/login",
        { email:mail,password:pass },
        config
      );
      toast({
        title: "Login  successfull ",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(true);
      Navigate("/chat");
    } catch (error) {
      toast({
        title: "Error occured ",
        status: "error",
        description: error.response.data.message,
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  // console.log(comp)
  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          // value={email}
          ref={email}
          type="email"
          placeholder="Enter Your Email Address"
          // onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel> 
        <InputGroup size="md">
          <Input
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
            ref={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={Loading}
      >
        Login
      </Button>
      {/* <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button> */}
    </VStack>
  );
};

export default Login;
