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
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
// cards
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddIcon from "@material-ui/icons/Add";
import ShareIcon from "@material-ui/icons/Share";
import DehazeIcon from "@material-ui/icons/Dehaze";
import DeleteIcon from "@material-ui/icons/Delete";
import UpIcon from "@material-ui/icons/ExpandLess";
import DownIcon from "@material-ui/icons/ExpandMore";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// search bar
import SearchBar from "material-ui-search-bar";
// drop down menu (for mode)
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { FiberSmartRecordSharp, LocalConvenienceStoreOutlined } from '@material-ui/icons';

import Login  from "./Login.js";
import userEvent from '@testing-library/user-event';
require("firebase/firestore");
const firebase = require('firebase-admin');

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

async function getMySpotifyPlaylists(access_token) {
  let res = await fetch("https://api.spotify.com/v1/me/playlists", {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      "Authorization": "Bearer "+access_token,
      "Content-Type": "application/json",
      "Accept": "application/json"},
  })
  let data = await res.json();
  if(data.items)
    return data.items
  return []
}

//Search for artists, playlists, songs using keyword q, and access token
async function searchItem (access_token, search_key, search_type) {
  let res = await fetch(`https://api.spotify.com/v1/search?q=${search_key}&type=${search_type}&limit=1`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      "Authorization": "Bearer "+access_token,
      "Content-Type": "application/json",
      "Accept": "application/json"},
    param: {
      "q": search_key, 
      "type": search_type,
      "limit": 1
    }
  })
  console.log("printing res ");
  let data = await res.json();
  console.log("search data val " + JSON.stringify(data));
  if(data.items)
    return data.items
  return []
}

async function getMyCollections(userId) {
  console.log("get my collections ruinn")
  let res = await fetch("https://localhost:8888/getMyCollections?userId="+userId)
  const data = await res.json();
  return Object.values(data);
}

async function getCollection(uuid) {
  console.log("getting collection uuid ",  uuid)
  let uuid_segments = uuid._path.segments
  console.log("getting collection uuid ",  uuid_segments)
  let res = await fetch("https://localhost:8888/getCollection?uuid="+uuid_segments)
  const data = await res.json();
  console.log("got collection ", data);
  return Object.entries(data);
}

// async function searchSpotifyPlaylists(access_token, keyword) {
//   console.log("searching public spotify playlists with for " + keyword + "token:"+access_token)
// }

export default function Dashboard() {
  var qs = new URLSearchParams(useLocation().search);
  let it = qs.keys();
  let result = it.next();
  while (!result.done) {
    result = it.next();
  }
  const [id, setId] = React.useState(null)
  const [email, setEmail] = React.useState(null)
  const [loggedin, setLoggedin] = React.useState(qs.get("access_token")!=null); 
  function getCurrentUser(token) {
    return fetch("https://api.spotify.com/v1/me", {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          "Authorization": "Bearer "+token,
          "Content-Type": "application/json",
          "Accept": "application/json"},
      }).then(res => {
        res.json().then(async data => {
          let res = await getMyCollections(data.email);
          console.log("my collections ", res)
          setCollections(res)
          if(res[0]!=undefined) {
            setCurrentCollection(res[0])
            setCollectionName(res[0].id)
            setEmail(data.email)
            console.log(data)
          }
          return data
        })
      })
  }
  const [ collections, setCollections] =              React.useState([]);        //look at discord
  const [ current_collection, setCurrentCollection] = React.useState({id: "test", items:{}});
  const [ access_token, setAccessToken] =             React.useState(qs.get("access_token"));
  const [ refresh_token, setRefreshToken] =           React.useState("");
  // search component
  const [ myPlaylists, setMyPlaylists] =      React.useState([]);
  const [ searchResults, setSearchResults ] = React.useState([]);
  const [ searchWord, setSearchWord ] =       React.useState("");
  const [ mode, setMode ] =                   React.useState("My Playlists");
  const [ collection_name, setCollectionName ] =       React.useState("");

  async function selectCollection(c) {
    console.log("selecting collection " + c.id + " with items " + c.items)
    setCurrentCollection(c)
  }
  React.useEffect(async () => {
    getCurrentUser(qs.get("access_token"));
    let data = await getMySpotifyPlaylists(access_token);
    //let data = await searchItem(access_token, "hello", "playlist");
    //let data = await searchItem(access_token, "rick", "artist");
    console.log("got my spotify playlists " + data);
    setMyPlaylists(data);
    setSearchResults(["result1", "result2"]);
    let musicObjects = {}
    // musicObjects["test playlist"] = {links:["initialLink1","initialLink2"]}
    // musicObjects["test artist"] =   {links:["initialLink3","initialLink4"], topSongsNumber: 10}
    // musicObjects["test song"] =     {links:["initialSongLink"]}
    setCurrentCollection({id:"loading", items: musicObjects})
  }, [])

  async function logOut(){
    //delete auth tokens here
    //window.localStorage.clear('access');
    //window.localStorage.clear('refresh');
    window.localStorage.clear();
    //redirect to spotify here
    window.location.replace("http://localhost:3000/");
    //cannot go back one page
    window.history.forward(-1);
  }

  async function deleteFromDataBase() {
    let current = current_collection.id
    let res = await fetch("https://localhost:8888/deleteFromDataBase?current="+ current + "&email=" + email)
    let result = await getMyCollections(email);
    setCollections(result)
  }

  async function createEmpty(name) {
    const userEmail = email
    console.log("bouta start creating")
    let res = await fetch("https://localhost:8888/createEmpty?userEmail="+ userEmail + "&name=" + name)
    console.log("this is the result of createEmpty " + res)
    console.log("get here LOOOOOOOOOOOOOOOOOOOOOOOOOOOOL")
    let result = await getMyCollections(email);
    setCollections(result)
    console.log("NEWCollection" + collections)
  }

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper);

  function updateSearch() {
    //if (mode==="My Playlists") {}
      
    if(mode==="Public Playlists")
      searchItem(access_token, searchWord, "album,playlist");
    else if (mode==="Public Artists")
      searchItem(access_token, searchWord, "artist");
    else if (mode==="Public Songs") 
      searchItem(access_token, searchWord, "track");
  }
  function getResults() {
    if(mode==="My Playlists") {
      return myPlaylists.filter(p => {return p.name.includes(searchWord)})
    }
    else if(mode==="Public Playlists") {
      return null;
    }
    else if (mode==="Public Artists")
      return searchItem(access_token, searchWord, "artist");
    else if (mode==="Public Songs") {}
    return ["bad state"]
  }

  // get all track ids from 
  async function getAllTracksFromId(musicObj) {
    let ids = []
    let res = null;
    if(musicObj.type==="playlist") {
      res = await fetch("https://api.spotify.com/v1/playlists/"+musicObj.id, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          "Authorization": "Bearer "+access_token,
          "Content-Type": "application/json",
          "Accept": "application/json"},
      })
      let data = await res.json();
      console.log("get id list " +  Object.values(data.tracks));
      ids = Object.values(data.tracks.items).map(x => {
        console.log("x " + JSON.stringify(x))
        return x.track.uri
      })
      return ids
    }
  }

  async function addToCollection(thingToadd) {
    // only add to our view if it is not ther already
    console.log("adding element " + thingToadd + " to current collection " + current_collection.id)
    let newCollectionItems = current_collection.items
    let uris = await getAllTracksFromId(thingToadd)
    newCollectionItems[thingToadd.name] = thingToadd
    setCurrentCollection({id:current_collection.id, items:newCollectionItems})
    let res = await fetch("https://localhost:8888/addToCollection?userId="+email + 
        "&collectionName=" + current_collection.id + 
        "&thingToAdd=" + thingToadd.name +
        "&uris=" + uris)
  }
  
  async function removeFromCollection(idToRemove) {
    console.log("removing " + idToRemove)
    let newCollectionItems = current_collection.items   //.filter(x=>{return x.id==thingToRemove.name})
    delete newCollectionItems[idToRemove]
    setCurrentCollection({id:current_collection.id, items:newCollectionItems})
    let res = await fetch("https://localhost:8888/removeFromCollection?userId="+email + 
      "&collectionName=" + current_collection.id + 
      "&idToRemove=" + idToRemove)
  }

  async function renameCollection() {
    console.log("renaming collection " + current_collection.id + " to " + collection_name)
    setCurrentCollection({id:collection_name, items:current_collection.items})
    var newShit = {}
    // Object.entries(current_collection.items).forEach(x=>{
    //   console.log(x)
    //   newShit[x[0]] = x[1]
    // })
    let res = await fetch("https://localhost:8888/renameCollection?userId="+email + 
      "&oldName=" + current_collection.id + 
      "&oldItems=" + newShit + 
      "&newName=" + collection_name)
  }

  async function exportPlaylist(access_token) {
    // console.log("exporting collection " + current_collection + " to user " + email)
    let res = await fetch("https://api.spotify.com/v1/users/"+ email + "/playlists" , {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      "Authorization": "Bearer "+access_token,
      "Content-Type": "application/json",
      "Accept": "application/json"},
    data: {
      "name" : "Spotify react",
      "public" : false}
    })
    let data = await res.json();
    // console.log("exported result " + data)
    if(data.items)
      return data.items
    return []
  }
  function collectionCard(keyValue) {
    let info = "";
    let artisStuff = "";
    const id = keyValue[0]
    const musicItem = keyValue[1]
    // console.log("collection card id "+ id + " value " + musicItem)
    if(musicItem.length>1) {
      let artistStuff = ""
      info = 
        (<Typography variant="body2" color="textSecondary" component="p">
          Tracks Total: {musicItem.length}
        </Typography>)
    }
    if(musicItem.topSongsNumber) {
      artisStuff = (
        <>
        <IconButton aria-label="add to favorites">
          <UpIcon />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <DownIcon />
        </IconButton>
        </>
      )
    }
    return (
      <Card style={{display: 'flex', margin: "5px"}}>
        <CardContent>
          <Typography gutterBottom variant="h7" component="h5">
            {""+id}
          </Typography>
          {info}
        </CardContent>
        <CardActions disableSpacing disableSpacing style={{"margin-left": "auto"}}>
          {artisStuff}
          <IconButton aria-label="add to favorites" onClick={()=>removeFromCollection(id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
  
  function SearchCard(musicObject) {
    let playliststuff = null
    let links = []
    if(musicObject.tracks)  {
      playliststuff = (
        <Typography variant="body2" color="textSecondary" component="p">
            Tracks Total: {musicObject.tracks.total}
          </Typography>
      )
      // console.log("musicObject.tracks " + musicObject)
      // links = Object.musicObject.tracks.map(t=>{return t.id})
    }
    return (
      <Card style={{maxWidth: "225px", display: 'flex', margin: "5px"}}>
        <CardContent>
          <Typography gutterBottom variant="h7" component="h5">
            {""+musicObject.name}
          </Typography>
          {playliststuff}
        </CardContent>
        <CardActions disableSpacing style={{"margin-left": "auto"}}>
          <IconButton aria-label="add to favorites" onClick={()=>addToCollection(musicObject)}>
            <AddIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
  function modeButton() {
    return (
      <>
      <Select 
        style={{maxWidth: 345, display: 'flex', margin: "5px"}}
        autoWidth={false}
        value={"My Playlists"}
        onChange={(newValue) => setMode(newValue)}
        //onSubmit={() => updateSearch()}
      >
        <MenuItem value={"My Playlists"}>My Playlists</MenuItem>
        <MenuItem value={"Public Playlists"}>Public Playlists</MenuItem>
        <MenuItem value={"Public Artists"}>Public Artists</MenuItem>
        <MenuItem value={"Public Songs"}>Public Songs</MenuItem>
      </Select>
      </>
    )
  }

  function SearchArea() {
    return (
      <>
      {modeButton()}
      <SearchBar
        searchWord={searchWord}
        onChange={(newValue) => setSearchWord(newValue)}
        onSubmit={() => updateSearch()}
      />
      <Card>{getResults().map((pl) => {return SearchCard(pl)})}</Card>
      </>
    )
  }

  if(loggedin)
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
            <DehazeIcon></DehazeIcon>
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={() => logOut()}>
              <Badge badgeContent={"log out"} color="secondary">
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
              <ArrowBackIosIcon/>
            </IconButton>
          </div>
          <Divider />
          {collections.map(c => {return <Card onClick={() => {selectCollection(c)}}>{c.id}</Card>})}
          <IconButton onClick={() => createEmpty("new")}>
              <AddIcon/>
            </IconButton>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <Paper className={fixedHeightPaper}>
                  {/* <Typography gutterBottom variant="h7" component="h5">
                    {""+current_collection.id}
                  </Typography> */}
                  <TextField id="standard-basic" label="Name" value={collection_name} defaultValue = {current_collection}
                    onChange={(e)=> {
                      // let newCurrColl = current_collection
                      // newCurrColl.id = e.target.value;
                      // console.log("new target val " + e.target.value)
                      // console.log("curr_collection_id " + current_collection.id)
                      // setCurrentCollection(newCurrColl)
                      setCollectionName(e.target.value)
                    }}>
                      <FormControl type="text" value={collection_name} defaultValue = {collection_name} />
                    </TextField>
                  {Object.entries(current_collection.items).map((p)=>{return collectionCard(p)})}
                  <Button onClick={() => exportPlaylist()}> Export</Button>
                  <Button onClick={() => deleteFromDataBase()}>Delete collection</Button>
                  <Button onClick={() => renameCollection()}>Rename</Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper className={fixedHeightPaper}>
                  {SearchArea()}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  else
    return <Login />
}