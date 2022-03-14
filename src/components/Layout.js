import Head from 'next/head';
import Link from 'next/link';
import {
  Box,
  Heading,
  Button,
  Container,
  useDisclosure,
  HStack,
  Stack,
  Spacer,
  VStack,
  Grid,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const MenuItem = ({ href, children, ...props }) => (
  <Link href={href} passHref>
    <Button as="a" variant="link" {...props}>
      {children}
    </Button>
  </Link>
);

function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="blue.500">
      <Container>
        <Stack
          as="nav"
          direction={['column', undefined, 'row']}
          justify="space-between"
          wrap="wrap"
          py="1.5rem"
        >
          <HStack justify="space-between">
            <MenuItem href="/" mr={8}>
              <Heading size="lg">Movies DB</Heading>
            </MenuItem>

            <Box display={['block', undefined, 'none']} onClick={onToggle}>
              <Button variant="outline">
                <HamburgerIcon />
              </Button>
            </Box>
          </HStack>

          <Stack
            direction={['column', undefined, 'row']}
            justify="start"
            align={['start', undefined, 'center']}
            display={[isOpen ? 'flex' : 'none', undefined, 'flex']}
            spacing={4}
            bg={['blue.700', undefined, 'inherit']}
            p={[2, undefined, 0]}
          >
            <MenuItem href="/search">Search</MenuItem>
            <MenuItem href="/watchlist">
              Watchlist
            </MenuItem>
            <MenuItem href="/history" >
              History
            </MenuItem>
          </Stack>

          <Spacer />

          <Box display={[isOpen ? 'block' : 'none', undefined, 'block']} >
            <MenuItem href="/" variant="outline" disabled>
              What to watch
            </MenuItem>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default function Layout({ title, children }) {

  return (
    <>
      <Head>
        {title && <title>{title} | MoviesDB</title>}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid minH="100vh">
        <VStack w="full" align="stretch" spacing={8}>
          <Header />
          <Box as="main" h="full">
            {children}
          </Box>
        </VStack>
      </Grid>
    </>
  );
}
