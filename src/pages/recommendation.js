
import {
    Box,
    Center,
    Container,
    Grid,
    Heading, Image, SimpleGrid,
    Text,
} from '@chakra-ui/react'
import Layout from "../components/Layout";






export default function Recommendation() {



    return (
        <Layout title="Recommended">
            <Container>
                <Heading>
                    Special for you:
                </Heading>
                <Center as="main">
                    <SimpleGrid columns={[2, 3, 4, 5]} spacing={5} mt={5}>
                        <Box bg='blue.500' height='300px' width='170px' borderRadius='5px' overflow='hidden'>
                            <Image
                                bg='tomato'
                                height='250px'
                                width='100%'
                            />
                            <Center w='100%' p={4}>
                                <Heading as='h5' size='sm'>
                                    Movie title
                                </Heading>
                            </Center>
                        </Box>


                    </SimpleGrid>
                </Center>
            </Container>
        </Layout>
    );

}





