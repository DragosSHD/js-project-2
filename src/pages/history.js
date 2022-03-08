import Layout from "../components/Layout";
import {
    Alert,
    AlertIcon,
    Box,
    Center,
    Container,
    Heading,
    Link,
    List,
    ListItem,
    Progress,
    Text,
    Divider
} from "@chakra-ui/react";
import useSWR from "swr";


function MovieList() {

    const {data, error} = useSWR('/api/history');

    if (!data) {
        return <Progress size="xs" isIndeterminate />;
    }
    if(!data.length) {
        return (
            <Alert status='warning'>
                <AlertIcon/>
                There are no movies in your history!
            </Alert>
        )
    }
    if(error) {
        return (
            <Alert status='error'>
                <AlertIcon/>
                Error occurred: {JSON.stringify(error)}
            </Alert>
        )
    }

    return (
        <Box>
            <Heading as='h2'>Your movie history:</Heading>
            <Center>
                <List bg='black'
                      w={{ base: '100%', md: '75%'}}
                      p={{base: '0 10px', md: '0 20px'}}
                      borderRadius={10}
                      className={'movies-list'}>
                    {data.map(({title, id}) => (
                        <Link href={`/movies/${id}`} key={id}>
                            <ListItem m='10px 0'>
                                <Center>
                                    <Text as="span" fontSize='xl' isTruncated>{title}</Text>
                                </Center>
                            </ListItem>
                            <Divider/>
                        </Link>
                    ))}
                </List>
            </Center>
        </Box>
    )

}

export default function History() {

    return (
        <Layout title="History">
            <Container>
                <MovieList />
            </Container>
        </Layout>
    );

}