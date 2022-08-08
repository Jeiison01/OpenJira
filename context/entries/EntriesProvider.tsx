import { PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pending: Proident dolor duis elit sunt qui dolor laborum beniam ea laboris qui consequat.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'Progress: Veniam dolor duis elit sunt qui dolor laborum beniam ea laboris qui consequat.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            _id: uuidv4(),
            description: 'Finished: Comodo dolor duis elit sunt qui dolor laborum beniam ea laboris qui consequat.',
            status: 'finished',
            createdAt: Date.now() - 100000
        },
    ],
}

export const  EntriesProvider = ({children}: PropsWithChildren) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({type: '[Entry] Add-Entry', payload: newEntry})
    }

    const updateEntry = (entry: Entry) => {
        dispatch({type: '[Entry] Entry-Updated', payload: entry});
    }

  return (
    <EntriesContext.Provider
        value={{
            ...state,

            //Methods
            addNewEntry,
            updateEntry
        }}
    >
        {children}
    </EntriesContext.Provider>
  )
}