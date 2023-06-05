import { Text } from '@chakra-ui/react';
import { Box, Heading, VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel, Input, Checkbox, Button, HStack } from '@chakra-ui/react';
import React from 'react';

const Connection: React.FC = () => {
  return (
  <Box 
    w={['full', 'md']}
    p={[8, 10]}
    mt={[20, '10vh']}
    mx='auto'
    border={['none', '1px']}
    borderColor={['', 'gray.300']}
    borderRadius={10}
    textAlign={'center'}
  >
    <VStack spacing={4} align='flex-start' w='full'>
      <VStack>
        <img src="../assets/logo_more.png" alt=""/>
        <p></p>
        <p></p>
        <Heading>Login</Heading>
      </VStack>

      <FormControl>
        <FormLabel>E-mail</FormLabel>
        <Input rounded='none' variant='filled'></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input rounded='none' variant='filled' type='password'></Input>
      </FormControl>
      <HStack w='full' justify='space-between'>
        <Checkbox>Remember me.</Checkbox>
        <Button variant='link' colorScheme='blue'>
          Forgot Password?
        </Button>
      </HStack>
      <Button rounded='none' colorScheme='blue' w={['auto', 'full']}>Login</Button>
      <a href="/register">
      <Button variant='link' colorScheme='blue' >S'inscrire ?</Button>
      </a>
    </VStack>
  </Box>

  )
}

export default Connection
