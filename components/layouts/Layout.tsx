import { Box } from "@mui/material"
import Head from "next/head"
import { PropsWithChildren } from "react";
import { NavBar, Sidebar } from "../ui";

interface Props {
    title?: string;
}

export const Layout = ({title = 'OpenJira', children}: PropsWithChildren<Props>) => {
  return (
    <Box sx={{flexFlow: 1}}>
        <Head>
            <title>{title}</title>
        </Head>

        <NavBar/>
        <Sidebar/>

    <Box sx={{padding: '10px 20px'}}>
        {children}
    </Box>

    </Box>
  )
}