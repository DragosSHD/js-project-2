import {useRouter} from "next/router";
import useSWR from "swr";
import {IconButton, Text, Tooltip} from "@chakra-ui/react";
import { SmallAddIcon, SpinnerIcon } from "@chakra-ui/icons";
import {fetcher} from "../../utils/api";


export default function WatchlistButton() {
    const { id } = useRouter().query;
    const { data, mutate } = useSWR(`/api/watchlist/${id}`);

    return (
      <Tooltip label={data?.found ? 'Add to watchlist' : 'Remove from watchlist'}>
          <IconButton
            isLoading={!data}
            aria-label='Trigger watchlist'
            colorScheme={data?.found ? 'purple' : 'gray'}
            size='sm'
            onClick={() => {
                mutate(() =>
                    fetcher(`/api/watchlist/${id}`, {
                        method: data.found ? 'DELETE': 'PUT'
                    })
                );
            }}>
              <SmallAddIcon/>
          </IconButton>
      </Tooltip>
    );


}