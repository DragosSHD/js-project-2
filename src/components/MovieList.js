import useSWR from "swr";
import {Alert, AlertIcon, Box, Center, Divider, Heading, Link, List, ListItem, Progress, Text} from "@chakra-ui/react";

export default function MovieList(props) {

    const {data, error} = useSWR(`/api/${props.apiRoute}`);

    if (!data) {
        return <Progress size="xs" isIndeterminate />;
    }
    if(!data.length) {
        return (
            <Alert status='warning'>
                <AlertIcon/>
                There are no movies in your {props.listName}!
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
            <Heading as='h2'>Your movie {props.listName}:</Heading>
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