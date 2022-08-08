import { DragEvent, PropsWithChildren, useContext } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';

interface Props {
    entry: Entry;
}

export const EntryCard = ({entry}: PropsWithChildren<Props>) => {

    const {startDraggin, endDraggin} = useContext(UIContext)

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id)
        startDraggin()
    }

    const onDragEnd = () => {
        endDraggin()
    }
  return (
    <Card
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
                <Typography variant="body2">Hace 30 minutos</Typography>
            </CardActions>
        </CardActionArea>

    </Card>
  )
}
