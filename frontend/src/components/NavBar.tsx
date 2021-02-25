import { Box, Button, Flex, Link} from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{fetching: logoutFetching}, logout] = useLogoutMutation();
  const [{data, fetching}] = useMeQuery();
  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={4}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white" mr={4}>
            Register
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr = {2} color = "white">{data.me.username}</Box>
        <Button onClick = {() => {
          logout();
        }}
        isLoading = {logoutFetching}
        variant = "link">Logout</Button>
      </Flex>
    );
  }
    return (
      <Flex bg = "#00B5D8" p = {4}>
        <Box ml = {"auto"}>
          {body}
        </Box>
      </Flex>
    );
}