import { PropsWithChildren, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const  EntriesProvider = ({children}: PropsWithChildren) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    useEffect(() => {
        refreshEntries()
    }, [])
    

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

    
    const refreshEntries = async() => {
        const {data} = await entriesApi.get<Entry[]>('/entries');
        dispatch({type: '[Entry] Initial-Data', payload: data})
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