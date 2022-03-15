
import {
    Alert, AlertIcon,
    Box,
    Center,
    Container,
    Grid,
    Heading, Image, Progress, SimpleGrid,
    Text, Tooltip,
} from '@chakra-ui/react'
import Layout from "../components/Layout";
import useSWR from "swr";
import Link from 'next/link';
import {buildImageUrl} from "../../utils/api";


function RecommendationResults() {

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

    return (<Center as="main">
            <SimpleGrid columns={[2, 3, 4, 5]} spacing={5} mt={5}>
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
            </SimpleGrid>
            </Center>);


}


export default function Recommendation() {

    return (
        <Layout title="Recommended">
            <Container>
                <Heading>
                    Special for you:
                </Heading>
                <RecommendationResults/>
            </Container>
        </Layout>
    );

}





