import { Flex, Image, Text } from '@mantine/core';

const AppLogo = () => {
  return (
    <Flex p={8} justify="center" maw={50} direction="row" gap={10}>
      <Image src="/images/logo.svg" alt="Shopy logo" />
      <Text size="xl">Shopy</Text>
    </Flex>
  );
};

export default AppLogo;
