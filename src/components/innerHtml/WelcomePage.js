import React, { useState } from "react";
import {
  Button,
  Code,
  Title,
  MantineProvider,
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Stack,
} from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
  width: 30vw;
  overflow: hidden;
`;

function WelcomePage() {
  const { toggle, fullscreen } = useFullscreen();

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  console.log("WelcomePage");
  return (
    <Container>
      <h1>test</h1>
      <Stack
        align="flex-end"
        justify="space-between"
        spacing="sm"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          height: 300,
        })}
      >
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button onClick={toggle} color={fullscreen ? "red" : "blue"}>
          {fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        </Button>
      </Stack>
    </Container>
  );
}

export default WelcomePage;
