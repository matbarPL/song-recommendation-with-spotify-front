import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';
import COLOR from '../../assets/colors'
import image from '../../assets/no_spotify_icon.png';
import {getToken} from '../../utils/UserFunctions'

const drawerWidth = '15%';
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,  
        backgroundColor: COLOR.black,
        color: COLOR.white,
        paddingLeft: theme.spacing(1),
        paddingTop: theme.spacing(6),
    },
    columnFlex: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%'
    },
    participant: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: theme.spacing(5),
        justifyContent: 'space-between',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        '&:last-child': {
            paddingBottom: '100px'
        }
    },
    toolbar: theme.mixins.toolbar,
}));
const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

export default function ParticipantsMenu(props) {
    const classes = useStyles();
    const [state, setState] = React.useState(
        props.event.participants
    );
    const [a, setA] = React.useState(
        false
    );
    React.useEffect(() => {
        async function getEventInfo() {
            setState(props.event.participants);
        }
        getEventInfo();
    }, [state, props]);

    const grantAdmin = async(index,token) =>{
        
        await axios.post('/event/'+props.event.id+'/grant-admin?username='+state[index].user.username,{}, {headers:{
            'Authorization': `Bearer ${token}`
        }});
        state[index].role = 'admin'
    }
    const revokeAdmin = async(index,token) =>{
        
        let res = await axios.post('/event/'+props.event.id+'/revoke-admin?username='+state[index].user.username,{}, {headers:{
            'Authorization': `Bearer ${token}`
        }});
        state[index].role = 'member'
    }
    const removeUser = async(event) =>{
        let token = getToken()
        const index = event.target.className;
        let res = await axios.post('/event/'+props.event.id+'/remove-user?username='+state[index].user.username,{}, {headers:{
            'Authorization': `Bearer ${token}`
        }});
        state.splice(index, 1);
        setA(!a);
    }
    const handleChange = async (event) => {
        let token = getToken()
        await (event.target.checked? grantAdmin(event.target.name,token): revokeAdmin(event.target.name,token));
        
        setA(!a);  
    };
    
    return(
            
            <Drawer anchor="right" className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
                <div className={classes.toolbar} />

                    <Typography style={{lineHeight: "1.5rem",textAlign: "center"}} variant="h5" color="textPrimary">
                        Uczestnicy
                    </Typography>
                    <Typography style={{lineHeight: "1.25rem",textAlign: "center", marginBottom: '24px'}} color="textPrimary">
                            wydarzenia
                    </Typography>
 
                        
                    <>
                    {state.map((participant, index) => (
                            <div className={classes.participant}>

                                
                                <Avatar
                                    style={{height:'56px', width:'56px'}}
                                    alt={`Avatar`}
                                    src={participant.user.avatar_url || image}
                                />
                                <div className={classes.columnFlex}>    
                                <Typography color = 'textPrimary' >
                                    {participant.user.username}
                                </Typography>
                                <Typography color = {participant.role === 'admin' ? 'textSecondary' : 'textPrimary'}
                                style = {
                                    {
                                        fontSize: '12px',
                                        marginBottom: '4px',
                                    }
                                } >
                                    {participant.role==='admin'?'ADMIN':'BASIC'}
                                </Typography>
                                {props.isAdmin?
                                <AntSwitch checked={participant.role==='admin'?true:false} onChange={handleChange} name={index}/>
                                :''}
                                </div>
                                <span span style = {
                                    {
                                        alignSelf: 'flex-end',
                                        cursor: 'pointer',
                                        visibility: props.isAdmin?'':'hidden',
                                    }
                                }
                                onClick = {
                                    removeUser
                                }
                                class = {
                                    index
                                } >
                                    X
                                </span>
                            </div>
                    ))}
                    </>
                    
                    
                
                
                
            </Drawer>
    )
}