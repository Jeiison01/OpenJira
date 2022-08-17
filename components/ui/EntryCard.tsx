import { DragEvent, PropsWithChildren, useContext } from 'react';
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';
import { dateFunctions } from '../../utils';

interface Props {
    entry: Entry;
}

export const EntryCard = ({entry}: PropsWithChildren<Props>) => {

    const {startDraggin, endDraggin} = useContext(UIContext)
    const router = useRouter()

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id)
        startDraggin()
    }

    const onDragEnd = () => {
        endDraggin()
    }

    const onClick = () => {
        router.push(`/entries/${entry._id}`)
    }

  return (
    <Card
    onClick={onClick}
        sx={{marginBottom: 1}}
        //Eventos del drag
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace: 'pre-line'}}>{entry.description}</Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                <Typography variant="body2">{dateFunctions.getFormatDistanceToNow(entry.createdAt)}</Typography>
            </CardActions>
        </CardActionArea>

    </Card>
  )
}
