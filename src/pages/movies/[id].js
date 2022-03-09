import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import useSWR from 'swr';
import { buildImageUrl } from '../../../utils/api';
import {
  Badge,
  Box,
  Center,
  CircularProgress,
  Container,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
  Link,
} from '@chakra-ui/react';
import {ExternalLinkIcon} from'@chakra-ui/icons';
import Layout from '../../components/Layout';
import Error from "next/error";
import WatchlistButton from "../../components/WatchlistButton";

const MovieContent = () => {
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/movies/${id}`);

  if (error) {
    return (
      <Text color="red">
        Error fetching movie with ID {id}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  let movieWebsite;
  if(data.homepage) {
    movieWebsite = (
        <Box>
          <Link href={data.homepage} isExternal>
            <Text>Movie Website <ExternalLinkIcon /></Text>
          </Link>
        </Box>
    );
  }

  if(!data.id) {
    return  (
        <Error statusCode={404} />
    )
  }

  return (
    <Stack direction={['column', 'row']} spacing={4}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Box minW="300px" pos="relative">
        <HStack pos="absolute" zIndex={1} top={2} right={2}>
          <WatchlistButton />
        </HStack>
        <Image
          src={data.poster_path ? buildImageUrl(data.poster_path, 'w300') : '/no-img.png'}
          alt="Movie poster"
          layout="responsive"
          width="300"
          height="450"
          objectFit="contain"
          priority
          unoptimized
        />
      </Box>
      <Stack>
        <HStack justify="space-between">
          <Heading as="h2">{data.title}</Heading>
          <Box>
            <Tag colorScheme="purple" variant="solid">
              {data.release_date}
            </Tag>
          </Box>
        </HStack>
        <Box><Badge variant='subtle'>{data.original_language}</Badge></Box>
        <Box>{data.tagline}</Box>
        <Stack direction="row">
          {data.genres?.map((genre) => (
            <Badge key={genre.id} colorScheme="purple" variant="outline">
              {genre.name}
            </Badge>
          ))}
        </Stack>
        <Box>{data.overview}</Box>
        {movieWebsite}
      </Stack>
    </Stack>
  );
};

export default function Movie() {
  return (
    <Layout>
      <Container h="full">
        <MovieContent />
      </Container>
    </Layout>
  );
}
