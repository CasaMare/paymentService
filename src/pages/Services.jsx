import React, { useState, useEffect } from "react";
import { Button, Grid, TextField, Box, Paper, Card, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import './../style/App.css';

const Services = ({API}) => {
    
    const [services, setServices] = useState({mainList : [], afterSearching : false});

    useEffect(() => {
        const fetchData = async () => {
            let serviceList = await API.Client.apiCall('Services/GetTopServicesList',{'category' : 'top'});
            if(0 === services['mainList'].length){
                setServices({mainList : serviceList['items'], afterSearching : serviceList['items']});
            }
        } 
        fetchData(); 
      },[services['mainList']]);

    const search = (e) => {
      console.log('mainList',services['mainList']);
      let value = e.target.value;
      if(value.length > 0){
        let searchResult = [];
        for(let i=0; i < services['mainList'].length ; i++ ){
         console.log(i);
          if(services['mainList'][i]['name'].toLowerCase().indexOf(value.toLowerCase()) + 1 > 0){
            searchResult.push(services['mainList'][i]);
          }
        }
        setServices({...services,afterSearching:searchResult});
      }else{
        setServices({...services,afterSearching:services['mainList']});
      }
      
    }

    return(
        <>
        <Grid   container
                   columns={8}>
                   <Grid className="main-container"  item xs={8} padding={5}>
                       <Grid container spacing={1} columns={12} columnSpacing={2}>
                        <Grid item xs={12}>
                          <TextField id="outlined-basic" label="Поиск" variant="outlined" onChange={search} />
                        </Grid>
                       { !services['afterSearching'] ?
                        <CircularProgress style={{margin:"auto"}} size={60} />
                        :services['afterSearching'].map((service) => (
                            <Grid key={service['inname']} item  xs={3} >
                                <Card raised style={{height:"225px", padding:"5px", cursror:"pointer", display: "flex", flexDirection: "column"}}>
                                    <img style={{  maxHeight:"70px", maxWidth: "105px", margin:"auto" }}  src={ "https://st.bpay.md/" + service.logo } alt=""/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        {service['name']}
                                        </Typography>
                                    </CardContent>
                                    <CardActions style={{ marginTop: "auto" }}>
                                    <Button variant="outlined" startIcon={<EuroSymbolIcon />}>Pay</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                        }
                       </Grid>
                     
                   </Grid>
           </Grid>
        </>
    );
}

export default Services;
