import { CalendarIcon } from '@chakra-ui/icons';
import {
    AlertDialog, AlertDialogBody, AlertDialogCloseButton,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Button,
    IconButton,
    Tooltip, useDisclosure
} from '@chakra-ui/react';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from '../../utils/api';
import React from "react";

function WarningDialog(props) {

    const cancelRef = React.useRef();

    return (
        <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={props.onClose}
            isOpen={props.isOpen}
            isCentered
        >
            <AlertDialogOverlay/>
            <AlertDialogContent>
                <AlertDialogHeader>Movie is in watchlist!</AlertDialogHeader>
                <AlertDialogCloseButton/>
                <AlertDialogBody>
                    You can add this movie to your history by marking it as seen from the watchlist.
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Link href={'/watchlist'}>
                        <Button colorScheme='blue' ml={3} autoFocus>
                            Watchlist
                        </Button>
                    </Link>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

}

export default function HistoryButton(props) {
      console.log(props.id);
      const id = props?.id;
      const { data, mutate } = useSWR(`/api/history/${id}`);
      const { data: watchlistData } = useSWR(`/api/watchlist/${id}`);
      const { isOpen, onOpen, onClose } = useDisclosure();

    let alertBtn;
    if(!data?.found && watchlistData?.found) {
        alertBtn = <WarningDialog
            onClose={onClose}
            isOpen={isOpen}
            onOpen={onOpen}
            id={id}
            data={data}
            mutate={mutate}/>;
    } else {
        alertBtn = null;
    }

  return (
      <>
          <Tooltip label={data?.found ? 'Remove from history' : 'Add to history'}>
              <IconButton
                  isLoading={!data}
                  colorScheme={data?.found ? 'purple' : 'gray'}
                  size="sm"
                  onClick={() => {
                      if(!data?.found && alertBtn) {
                          onOpen();
                      } else {
                          mutate(() =>
                              fetcher(`/api/history/${id}`, {
                                  // If movie is in history, remove it from history, else, add it to history
                                  method: data.found ? 'DELETE' : 'PUT',
                              })
                          );
                      }
                  }}
                  aria-label='Trigger history'>
                  <CalendarIcon />
              </IconButton>
          </Tooltip>
          {alertBtn}
      </>
  );
}
