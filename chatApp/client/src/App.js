import { useEffect, useState } from 'react';
import './App.css';
import {AppBar, Container, Grid, Typography, Grow} from '@material-ui/core';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts'

const App = () =>{
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() =>{
    dispatch(getPosts());
  }, [dispatch])

  return(
    <>
      <Container maxWidth="lg">
        <AppBar className={classes.appbar} position="static" color="inherit"> 
          <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        </AppBar>
        <Grow in>
          <Container>
            <Grid container justifyContent="space-between" alignItems="stretch">
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId}/>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  )
}

export default App;
