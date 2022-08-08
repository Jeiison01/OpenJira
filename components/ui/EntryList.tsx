import { DragEvent, PropsWithChildren, useContext, useMemo } from 'react';
import { List, Paper } from "@mui/material"
import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./"
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList = ({status}: PropsWithChildren<Props>) => {

  const {entries, updateEntry} = useContext(EntriesContext)
  const {isDragging, endDraggin} = useContext(UIContext)


  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status),[ entries,status ])
  
  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }
  
  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text')
    const entry = entries.find(entry => entry._id === id)!;
    entry.status = status;

    updateEntry(entry)
    endDraggin()
  }

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
        <Paper sx={{height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', '&::-webkit-scrollbar': { display: 'none' }, padding: '1px 5px'}}>

            <List sx={{opacity: isDragging ? 0.3 : 1, transition: 'all .3s'}}>
              {entriesByStatus.map(entry => (
                <EntryCard key={entry._id} entry={entry}/>
              ))}
            </List>
        </Paper>
    </div>
  )
}
