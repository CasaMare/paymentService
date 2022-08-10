import {React, useEffect, useState} from "react";
import { Button, Grid, TextField, Box, Paper, Table, TableContainer, TableCell,  TableHead , TableRow, TableBody  } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NumbersIcon from '@mui/icons-material/Numbers';
import CircularProgress from '@mui/material/CircularProgress';
import Popup from "../components/UI/Popup";

const Cabinet = ({API}) => {
    const [accounts, setAccounts] = useState(false);
   
     useEffect(() => {
        const fetchData = async () => {
            let acc = await API.Client.apiCall('User/GetUserAccounts',[]);
            if(!accounts){
                setAccounts(acc);
            }
        } 
        fetchData(); 
      },[accounts]);

    return(
        <>
             <Box>
                <Grid  container
                        spacing={0}
                        columns={8}>
                        <Grid   item xs={8} padding={5}>
                            <Paper style={{
                                textAlign:"center",
                                maxWidth:"1280px",
                                margin:"auto",
                                padding:"50px",
                                background:"#fff"
                            }}>

                            {!accounts 
                            ? <CircularProgress size={60} />
                            : <>
                            <h2 style={{verticalAling:"middle"}}> Bank account info</h2>
                                <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell><AccountBalanceWalletIcon style={{color:"orange"}}/></TableCell>
                                        <TableCell align="right"><AccountBalanceIcon style={{color:"orange" }}/></TableCell>
                                        <TableCell align="right"><MonetizationOnIcon style={{color:"orange" }}/></TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {accounts['accounts'].map((account) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={account.Account}>
                                        <TableCell component="th" scope="row">
                                        <Popup 
                                            title={ "Additional information about the account:" + account.Account }
                                            msg="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." >
                                            <NumbersIcon style={{fontSize:"15px"}}/> 
                                            {account.Account}
                                       </Popup>
                                       </TableCell> 
                                            <TableCell align="right">{account.ExAccount}</TableCell>
                                            <TableCell align="right">{account.Sum} <b>{account.ValuteName}</b></TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            </> }
                            </Paper>
                        </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Cabinet; 