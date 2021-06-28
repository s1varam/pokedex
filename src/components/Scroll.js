import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';


const Scroll = ({
    showBelow,
}) => {

    let useStyles;

    const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === "dark") {
            useStyles = makeStyles((theme) => ({
                toTop: {
                    zIndex: 2,
                    position: 'fixed',
                    bottom: '2vh',
                    backgroundColor: '#DCDCDC',
                    color: 'black',
                    "&:hover, &.Mui-focusVisible": {
                        transition: '0.3s',
                        color: '#397BA6',
                        backgroundColor: '#DCDCDC'
                    },
                    [theme.breakpoints.up('xs')]: {
                        right: '5%',
                        backgroundColor: 'rgb(220,220,220,0.7)',
                    },
                    [theme.breakpoints.up('lg')]: {
                        right: '2.5%',
                    },
                }
            })
            )
        }else if(currentTheme === "light"){
            useStyles = makeStyles((theme) => ({
                toTop: {
                    zIndex: 2,
                    position: 'fixed',
                    bottom: '3vh',
                    backgroundColor: '#252a41',
                    color: '#DCDCDC',
                    "&:hover, &.Mui-focusVisible": {
                        transition: '0.3s',
                        color: '#397BA6',
                        backgroundColor: '#252a41'
                    },
                    [theme.breakpoints.up('xs')]: {
                        right: '5%',
                        backgroundColor: '#252a41',
                    },
                    [theme.breakpoints.up('lg')]: {
                        right: '2.5%',
                    },
                }
            })
            )
        }
    

    const classes = useStyles();

    const [show, setShow] = useState(showBelow ? false : true)

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true)
        } else {
            if (show) setShow(false)
        }
    }

    const handleClick = () => {
        window[`scrollTo`]({ top: 0, behavior: `smooth` })
    }

    useEffect(() => {
        if (showBelow) {
            window.addEventListener(`scroll`, handleScroll)
            return () => window.removeEventListener(`scroll`, handleScroll)
        }
    })

    return (
        <div>
            {show &&
                <IconButton onClick={handleClick} className={classes.toTop} aria-label="to top" component="span">
                    <ExpandLessIcon />
                </IconButton>
            }
        </div>
    )
}
export default Scroll