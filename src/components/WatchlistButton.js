import {useRouter} from "next/router";
import useSWR from "swr";
import {
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogHeader,
    IconButton,
    Tooltip,
    AlertDialog, useDisclosure, AlertDialogOverlay, AlertDialogFooter, Button
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import {fetcher} from "../../utils/api";
import React, {useState} from "react";


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
                <AlertDialogHeader>Add to watchlist?</AlertDialogHeader>
                <AlertDialogCloseButton/>
                <AlertDialogBody>
                    Are you sure you want to add this movie in your watchlist?
                    This will delete it from your history!
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' ml={3} onClick={() => {
                        props.mutate(() =>
                            fetcher(`/api/watchlist/${props.id}`, {
                                method: props.data.found ? 'DELETE': 'PUT'
                            })
                        );
                        props.onClose();
                    }
                    } autoFocus>
                        Add
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

}


export default function WatchlistButton() {
    const { id } = useRouter().query;
    const { data, mutate } = useSWR(`/api/watchlist/${id}`);
    const { data: historyData } = useSWR(`/api/history/${id}`);
    const { isOpen, onOpen, onClose } = useDisclosure();

    let alertBtn;
    if(!data?.found && historyData.found) {
        console.log("In history");
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
            <Tooltip label={data?.found ? 'Remove from watchlist' : 'Add to watchlist'}>
                <IconButton
                    isLoading={!data}
                    aria-label='Trigger watchlist'
                    colorScheme={data?.found ? 'purple' : 'gray'}
                    size='sm'
                    onClick={() => {
                        if(!data?.found && alertBtn) {
                            console.log("Hi " + alertBtn);
                            onOpen();
                        } else {
                            mutate(() =>
                                fetcher(`/api/watchlist/${id}`, {
                                    method: data.found ? 'DELETE' : 'PUT'
                                })
                            );
                        }
                    }}>
                    <SmallAddIcon/>
                </IconButton>
            </Tooltip>
            {alertBtn}
        </>
    );


}