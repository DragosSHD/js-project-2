import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import useSWR from 'swr';
import {
  Input,
  IconButton,
  Container,
  List,
  ListIcon,
  ListItem,
  Progress,
  Text,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  Badge, Box,
} from '@chakra-ui/react';
import {
  SearchIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';
import Layout from '../components/Layout';
import {buildImageUrl} from "../utils/api";
import Image from "next/image";

function SearchBar() {
  const router = useRouter();
  const { terms } = router.query;
  const [text, setText] = useState('');

  // Update text input when route changes (ex when user goes back/forward)
  useEffect(() => {
    setText(terms || '');
  }, [terms]);

  // Update router history if a search was performed
  const handleSearch = (event) => {
    event.preventDefault();
    if (text !== terms) {
      router.push(`/search/?terms=${text}`, undefined, { shallow: true });
    }
  };

  return (
    <InputGroup as="form" onSubmit={handleSearch}>
      <Input
        placeholder="Search for a movie..."
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
        />
      </InputRightElement>
    </InputGroup>
  );
}
function SearchResults() {
  const { terms } = useRouter().query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);

  if (!terms) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }
  if (error) {

    return (
      <Text color="red">
        Error fetching movies for {terms}: {JSON.stringify(error)} {error}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }
  if(!data.results) {
    return <Text>No results. ({data.status_message})</Text>;
  }
  if (!data.results.length) {
    return <Text>No results</Text>;
  }
  return (
    <List stylePosition="inside" spacing={2} style={{
      padding: '4px 0'
    }}>
      {data.results.map(({ id, title, release_date, poster_path }) => (
          <Link href={`/movies/${id}`} key={id} passHref>
            <ListItem key={id} className={'result-item'}>
                <Image
                    src={poster_path ? buildImageUrl(poster_path, 'w300') : '/no-img.png'}
                    alt="Movie poster"
                    width="100"
                    height="100"
                    objectFit="contain"
                    unoptimized
                />
                <Box w='95%'>
                  <Text as="div" isTruncated>{title}</Text>
                  <Badge>{release_date}</Badge>
                </Box>
            </ListItem>
          </Link>
      ))}
    </List>

  );
}

export default function Search() {
  return (
    <Layout title="Search">
      <Container>
        <VStack spacing={4} align="stretch">
          <SearchBar />
          <SearchResults />
        </VStack>
      </Container>
    </Layout>
  );
}
