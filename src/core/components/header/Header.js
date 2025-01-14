import React, { useEffect, useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { throttle } from 'throttle-debounce'
import * as MoviesActions from '../../../movies/store/actions'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
  title: {
    display: 'none',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const CustomHeader = props => {
  const { getMovies } = props
  const classes = useStyles()
  const [ param, setParam ] = useState({q: ''})

  useEffect(() => {
    autocompleteSearchThrottled()
    return () => {}
  }, [param])

  const onSearch = () => {
    getMovies(param)
  }

  const autocompleteSearchThrottled = () => {
    throttle(1000, onSearch())
  }

  const changeQuery = event => {
    setParam({q: event.target.value})
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            WOOKIE MOVIES
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={param.q}
              onChange={changeQuery}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  getMovies: params => dispatch(MoviesActions.getMovies(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader)
