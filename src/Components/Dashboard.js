import React from 'react';
import {
  useLocation
} from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
// cards
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
// search bar
import SearchBar from "material-ui-search-bar";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  }
}));


function ImgMediaCard(playlistName) {

  return (
    <Card style={{maxWidth: 345, display: 'flex', margin: "5px"}}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {""+playlistName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Playlist description
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}



class DashboardComp extends React.Component {
  state = {
    myPlaylists: [],
    searchResults:[],
    searchWord: "",
    mode: "My Spotify"
  }
  componentDidMount() {
    this.setState({
      myPlaylists: ["playlist1", "playlist2", "playlist2", "playlist2" ],
      searchResults:["result1", "result2"],
    })
  }
  searchSpotifyPlaylists() {
    console.log("searching spotify playlists")
  }
  updateSearch(newSearchWord) {
    if(this.state.mode==="Public Spotify")
      this.searchSpotifyPlaylists()
    else if(this.state.mode==="My Spotify")
    this.setState({
      myPlaylists: ["playlist1", "playlist2", "playlist2", "playlist2" ],
      searchWord: newSearchWord,
    })
  }
  getResults() {
    if(this.state.mode==="Public Spotify") {
      console.log('pub results: ' + this.state.searchResults)
      return this.state.searchResults
    }
    else if(this.state.mode==="My Spotify") {
      console.log(this.state.searchWord+ ' my results: ' + this.state.myPlaylists.filter(p => {return p.includes(this.state.searchWord)}))
      return this.state.myPlaylists.filter(p => {return p.includes(this.state.searchWord)})
    }
    return ["bad state"]
  }

  render() {
    return (
      <>
      <SearchBar
        searchWord={this.state.searchWord}
        onChange={(newValue) => this.setState({ searchWord: newValue })}
        // onRequestSearch={() => this.updateSearch(this.state.searchWord)}
      />
      <Card>{this.getResults().map((pl) => {return ImgMediaCard(pl)})}</Card>
      </>
    )
  }
}

export default function Dashboard() {
  var qs = new URLSearchParams(useLocation().search);
  // console.log(qs.toString());
  // console.log(qs.get("access_token"));
  // console.log(this.props.location.query.access_token)
  let it = qs.keys();
  let result = it.next();
  while (!result.done) {
    console.log(result.value); // 1 3 5 7 9
    result = it.next();
  }
  console.log("access_token", qs.get("access_token"))

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
          </IconButton>
        </div>
        <Divider />
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <DashboardComp ></DashboardComp>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}