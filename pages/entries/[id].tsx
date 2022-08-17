import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next'

import { Card, CardHeader, Grid, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';

import { Layout } from "../../components/layouts"
import { Entry, EntryStatus } from '../../interfaces';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry
}


const EntryPage = ({entry}: Props) => {

    const {updateEntry, deleteEntry } = useContext(EntriesContext)

    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)

    const isNotValid = useMemo(() => inputValue.length <=0 && touched, [inputValue, touched])

    const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus)
    }

    const onSave = () => {
        if(inputValue.trim().length === 0) return;
        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }
        updateEntry(updatedEntry, true)
    }

    const onDelete = () => {
        deleteEntry(entry, true);
    }


  return (
    <Layout title={inputValue.substring(0,20) + '...'}>
        <Grid
            container
            justifyContent="center"
            sx={{marginTop: 2}}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader
                        title={'Entrada:'}
                        subheader={`Creada: ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
                    />
                    <CardContent>
                        <TextField
                            sx={{marginTop: 2, marginBottom: 1}}
                            fullWidth
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            value={inputValue}
                            onBlur={() => setTouched(true)}
                            onChange={onInputValueChange}
                            helperText={isNotValid && 'Ingrese un valor'}
                            error={isNotValid}
                        />
                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup
                                row
                                value={status}
                                onChange={onStatusChange}
                            >
                                {
                                    validStatus.map(status => (
                                        <FormControlLabel
                                            key={status}
                                            value={status}
                                            control={<Radio />}
                                            label={capitalize(status)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button
                            startIcon={<SaveAsOutlinedIcon/>}
                            variant="contained"
                            fullWidth
                            onClick={onSave}
                            disabled={inputValue.length <=0}
                        >Save</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>

        <IconButton onClick={onDelete} sx={{position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark'}}>
            <DeleteOutlineOutlinedIcon/>
        </IconButton>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const {id} = params as {id: string};

    const entry = await dbEntries.getEntryById(id)

    if(!entry){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
    }
}

    return {
        props: {
            entry
        }
    }
}

export default EntryPage