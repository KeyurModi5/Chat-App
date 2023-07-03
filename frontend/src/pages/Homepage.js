import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/Authenticaiton/Log";
import SignUp from "../components/Authenticaiton/sign_up";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const history = useNavigate();
  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null
    );

    if (user) history("/chat");
    console.log(user);
  }, [history]);

  return (
    <Container maxW={"xl"}>
      <Box
        justifyContent="center"
        display="flex"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text justifyContent="center" fontSize="4xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sing up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
