import useSWR from "swr";
import {
    Alert,
    AlertIcon,
    Box,
    Center,
    Heading,
    List,
    ListItem,
    Progress,
    Button,
    Text, IconButton, HStack, Flex, Spacer, Divider, Icon, Tooltip
} from "@chakra-ui/react";
import {
    CalendarIcon,
    ViewIcon
} from "@chakra-ui/icons";
import Link from "next/link";
import HistoryButton from "./HistoryButton";
import {fetcher} from "../../utils/api";

export default function MovieList(props) {

    const {data, error, mutate} = useSWR(`/api/${props.apiRoute}`);

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
            <Center
                pt={['4', undefined, '10']}
            >
                <List bg='black'
                      w={{ base: '100%', md: '75%'}}
                      p={{base: '0 10px', md: '0 20px'}}
                      borderRadius={10}
                      className={'movies-list'}>
                    {data.map(({title, id}) => (
                        <ListItem p='10px 0' className='movie-list-item' key={id}>
                            <Flex align='center'>
                                <Center maxW='200'>
                                    <Text as="span" fontSize='xl' padding='12px' isTruncated>{title}</Text>
                                </Center>
                                <Spacer/>
                                <HStack>
                                    <Link href={`/movies/${id}`} passHref>

                                            <IconButton aria-label={'viewMovie'}>
                                                <ViewIcon />
                                            </IconButton>
                                    </Link>
                                    {props.addToHistoryBtn &&

                                        <Tooltip label='Add to history'>
                                            <IconButton
                                                colorScheme='blue'
                                                aria-label={'addToHistory'}
                                                onClick={() => {
                                                    mutate(() => {
                                                        fetcher(`/api/watchlist/${id}`, {method: 'DELETE'});
                                                        fetcher(`/api/history/${id}`, {method: 'PUT'});
                                                    })
                                                }}>
                                                <CalendarIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                </HStack>
                            </Flex>
                            <Divider />
                        </ListItem>
                    ))}
                </List>
            </Center>
        </Box>
    )

}