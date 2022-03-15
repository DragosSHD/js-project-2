import {
    Box,
    Center,
    Heading,
    VStack,
    HStack,
    Image,
    Container,
    Tooltip,
    Flex,
    Divider,
    Alert,
    AlertIcon, Progress
} from '@chakra-ui/react';
import Layout from '../components/Layout';
import Link from "next/link";
import {buildImageUrl} from "../../utils/api";
import useSWR from "swr";


function RecommendedMoviesRow() {

    const {data, error} = useSWR(`/api/recommended`);

    if(error) {
        return (
            <Alert status='error'>
                <AlertIcon/>
                Error occurred: {JSON.stringify(error)}
            </Alert>
        );
    }

    if(!data) {
        return <Progress size='xs' isIndeterminate/>;
    }

    if(!data.length) {
        return (
            <Alert status='warning'>
                <AlertIcon/>
                We could not find any recommendations for you.
            </Alert>
        )
    }

    // TODO: Make an horizontal slider to display the movies.

    return (
        <HStack>
            {data.map(({id, title, release_date, poster_path}) => (
                <Box className='grid-movie' bg='gray.700' height='300px' width='170px' borderRadius='5px' overflow='hidden' key={id}>
                    <Link href={`/movies/${id}`} passHref>
                        <Box>
                            <Image
                                src={poster_path ? buildImageUrl(poster_path, 'w300') : '/no-img.png'}
                                height='250px'
                                width='100%'
                            />
                            <Center w='100%' p={4}>
                                <Tooltip label={title}>
                                    <Heading as='h5' size='sm' isTruncated>
                                        {title}
                                    </Heading>
                                </Tooltip>
                            </Center>
                        </Box>
                    </Link>
                </Box>
            ))}
        </HStack>
    )

}



export default function Home() {
  return (
    <Layout title="Homepage">
      <Container>
          <VStack align='stretch' >
              <Heading as="hw">Our Recommendations</Heading>
              <Divider/>
              <RecommendedMoviesRow/>
          </VStack>
      </Container>
    </Layout>
  );
}
