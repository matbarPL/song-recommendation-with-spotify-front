import React from "react";
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';


import image1 from '../../assets/ikona1.png'
import image2 from '../../assets/ikona2.png'
import image3 from '../../assets/ikona3.png'
import image4 from '../../assets/ikona4.png'
import image5 from '../../assets/ikona5.png'
import image6 from '../../assets/ikona6.png'
import backgroundPopup from '../../assets/popup_954.png'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Grid from '@material-ui/core/Grid';


import COLOR from './../../assets/colors'


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    paper: {
        position: 'fixed',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        borderRadius: '16px 16px 16px 16px',
        borderStyle: 'solid',
        borderColor: COLOR.white,
        maxHeight: '90%',
        overflowY: 'scroll',
    },
    closeButton: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),      
        color: COLOR.pink,
    },
    grid:{
        marginTop: theme.spacing(1)
    },
    title: {

        color: COLOR.white,
    },
    photosGrid:{
        display: 'grid',
        gridTemplateColumns: '70px 70px auto 70px 70px',
        margin: theme.spacing(0,7),
        backgroundImage: image2,
    },
    eventPhoto: {
        height: theme.spacing(24),
        width: theme.spacing(24),
    },
    pickablePhoto: {
        height: theme.spacing(8),
        width: theme.spacing(8),
    },
    field: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        height: '30px !important',
        borderColor: 'yellow',
        [`& fieldset`]: {
            borderRadius: 50,
        },
    },
    multilineField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        height: '30px !important',
        borderColor: 'yellow',
        [`& fieldset`]: {
            borderRadius: 20,
        },
    },
    notchedOutline: {
        borderWidth: "2px",
        borderColor: COLOR.white
    },
    input: {
        borderWidth: "2px",
        borderColor: COLOR.white
    },
    focused:{
        borderColor: COLOR.white
    },
    disabled:{
        borderColor: COLOR.white
    },
    radioIcon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        borderColor: 'white',
        borderStyle: 'solid',
        borderWidth: '1px',
        backgroundColor: COLOR.darkBlue,
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
        },
        'input:disabled ~ &': {
        },
        
    }, 
    radioCheckedIcon: {

        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: `radial-gradient(${COLOR.pink} 35%,transparent 0%)`,

            content: '""',
        },
        'input:hover ~ &': {
        },
    },
    radioLabel: {
        color: COLOR.white
    },
    button: {
        minWidth: 304,
        background: COLOR.pink,
        borderRadius: 50,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginTop: theme.spacing(4),
    },
    radioContainer: {
            overflow: 'visible', 
        '&:before': {
            position: 'absolute',
            overflow: 'visible',
            content: "''",
            borderTop: '2px solid white',
            top: '28%', 
            left: '10%', 
            right: '12%', 
        }
    }
}));

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
        disableRipple
        color="default"
        checkedIcon={<span className={`${classes.radioIcon} ${classes.radioCheckedIcon}`} />}
        icon={<span className={classes.radioIcon}/>}
        {...props}
    />
  );
}

export default function CreateEventModal(props) {
    const classes = useStyles();
    const [duration, setDuration] = React.useState('5');
    const [availability, setAvailability] = React.useState('1');
    const [description, setDescription] = React.useState('');
    const [name, setName] = React.useState('');
    const [photo, setPhoto] = React.useState(image1);
    
    React.useEffect(() => {
        async function getEventInfo() {
            let token = localStorage.getItem('token');
            console.log(token)
            const result = await axios.get('/event/' + props.eventId, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const event = result.data.event;
            setDuration(event.duration_time+'');
            setAvailability('1');
            setDescription(event.description);
            setName(event.name);
            setPhoto(event.image_url);
            console.log(event);
        }
        getEventInfo();
    }, [props]);

    const handleClose = () => {
        props.setOpen(false);
    };
    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    };
    const handleAvailabilityChange = (event) => {
        setAvailability(event.target.value);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const changePhoto = (event) => {
        setPhoto(event.target.src);
    };
    const handleSubmit = async () => {
        let token = localStorage.getItem('token');
        let date = new Date().toJSON().split("T")[0];
        if(props.isEdit){
            
            let res = await axios.put('/event/'+props.eventId, {
                name: name,
                description: description,
                image_url: photo,
                start_date: date,
                end_date: date,
                duration_time: parseInt(duration)
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }else{
            let res = await axios.post('/event', {
                name: name,
                description: description,
                image_url: photo,
                start_date: date,
                end_date: date,
                duration_time: parseInt(duration)
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            res = await axios.get('/events', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const events = res.data.events;
            let eventAdded = events[events.length - 1];
            events.forEach((event) => {
                if (event.name === name) {
                    eventAdded = event;
                }
            })
            props.setInvLink(eventAdded.invitation_link);
            props.setEventId(eventAdded.id);
            props.setOpen(false);
            props.setOpenInvite(true);
        }
        handleClose()
    }
    

    

    return (
        <div>
            
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={props.open}
                onClose={handleClose}
            >
                
                <div className = { classes.paper} >
                    <HighlightOffIcon className = {classes.closeButton} onClick={handleClose}/>
                    <Typography variant="h5" className = {classes.title}>{props.isEdit?'EDYTUJ WYDARZENIE':'WYDARZENIE'}</Typography>
                    <Grid container spacing={2} className={classes.grid}>
                        <Grid item xs={3} align='right'>
                            <Typography color="textSecondary">
                                        Wizualna reprezentacja wydarzenia 
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                        </Grid>
                        <Grid item xs={12} align='center' className={classes.photosGrid}>
                            <Avatar alt="Remy Sharp" variant = "circle" src={image1} className={classes.pickablePhoto} style={{  gridColumnStart: 2,
  gridColumnEnd: 2,
  gridRowStart: 1,
  gridRowEnd: 1,}} onClick={changePhoto}/>
                            <Avatar alt="Remy Sharp" variant = "circle" src={image6} className={classes.pickablePhoto} style={{  gridColumnStart: 4,
  gridColumnEnd: 4,
  gridRowStart: 1,
  gridRowEnd: 1,}} onClick={changePhoto}/>
                            <Avatar alt="Remy Sharp" variant = "circle" src={photo} className={classes.eventPhoto} style={{  gridColumnStart: 3,
  gridColumnEnd: 3,
  gridRowStart: 1,
  gridRowEnd: 4,}} />
                            <Avatar alt="Remy Sharp" variant = "circle" src={image2} className={classes.pickablePhoto} style={{  gridColumnStart: 1,
  gridColumnEnd: 1,
  gridRowStart: 2,
  gridRowEnd: 2,}} onClick={changePhoto}/>
                            <Avatar alt="Remy Sharp" variant = "circle" src={image5} className={classes.pickablePhoto} style={{  gridColumnStart: 5,
  gridColumnEnd: 5,
  gridRowStart: 2,
  gridRowEnd: 2,}} onClick={changePhoto}/>
                              <Avatar alt="Remy Sharp" variant = "circle" src={image3} className={classes.pickablePhoto} style={{  gridColumnStart: 2,
  gridColumnEnd: 2,
  gridRowStart: 3,
  gridRowEnd: 3,}} onClick={changePhoto}/>
                            <Avatar alt="Remy Sharp" variant = "circle" src={image4} className={classes.pickablePhoto} style={{  gridColumnStart: 4,
  gridColumnEnd: 4,
  gridRowStart: 3,
  gridRowEnd: 3,}} onClick={changePhoto}/>
                        </Grid>
                        <Grid item xs={3} align='right'>
                            <Typography color="textSecondary">
                                        Nazwa wydarzenia 
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                InputProps={{ classes: {notchedOutline: classes.notchedOutline},} }
                                placeholder = "Dodaj czytelną i krótką nazwę"
                                className={classes.field}
                                onChange={handleNameChange}
                                value={name}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3} align='right'>
                            <Typography color="textSecondary">
                                        Opis 
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                InputProps={{ classes: {notchedOutline: classes.notchedOutline, focused: classes.focused},} }
                                placeholder = "Poinformuj znajomych o szczegółach wydarzenia..."
                                className={classes.multilineField}
                                value={description}
                                onChange={handleDescriptionChange}
                                margin="dense"
                                variant="outlined"
                                multiline
                                rows={4}
                                rowsMax={4}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} align='right'>

                        </Grid>
                        <Grid item xs={12} align='right'>

                        </Grid>
                        <Grid item xs={12} align='right'>

                        </Grid>
                        <Grid item xs={12} align='right'>

                        </Grid>
                        <Grid item xs={3} align='right'>
                            <Typography color="textSecondary">
                                        Czas trwania
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl component="fieldset">
                            <RadioGroup row value={duration} aria-label="czas trwania" name="customized-radios" onChange={handleDurationChange}>
                                <div className={classes.radioContainer}>
                                <FormControlLabel classes={{label: classes.radioLabel}} value="5" control={<StyledRadio />} label="5 godzin" labelPlacement="bottom"/>
                                
                                <FormControlLabel classes={{label: classes.radioLabel}} value="10" control={<StyledRadio />} label="10 godzin" labelPlacement="bottom"/>
                                
                                <FormControlLabel classes={{label: classes.radioLabel}} value="15" control={<StyledRadio />} label="15 godzin" labelPlacement="bottom"/>
                                
                                <FormControlLabel classes={{label: classes.radioLabel}} value="24" control={<StyledRadio />} label="24 godzin" labelPlacement="bottom"/>
                                </div>
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} align='right'>
                            <Typography color="textSecondary">
                                        Dostępność 
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container spacing = {2}>
                                <Grid item xs = {11}>
                                    <Typography color="textPrimary">
                                                BEZTERMINOWO
                                    </Typography>
                                    <Typography color="textPrimary">
                                                OKREŚLONA CZASEM
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <FormControl component="fieldset">
                                        <RadioGroup value={availability} aria-label="Dostępność" name="customized-radios" onChange={handleAvailabilityChange}>
                                            <FormControlLabel value="1" control={<StyledRadio />} />
                                            <FormControlLabel value="2" control={<StyledRadio />} />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        {availability==2?<><Grid item xs={3} align='right'>
                            
                        </Grid>
                        <Grid item xs={9} align='center'>
                            

                            <div styles = {
                                {
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }
                            } >

                            
                            <TextField
                                InputProps={{ classes: {notchedOutline: classes.notchedOutline, focused: classes.focused, disabled: classes.disabled}} }
                                id="date"
                                label="Rozpocznij"
                                type="date"
                                variant='outlined'
                                labelPlacement='top'
                                margin='dense'
                                defaultValue={new Date().toJSON().split("T")[0]}
                                inputProps={{'min': new Date().toJSON().split("T")[0], 'max': new Date().toJSON().split("T")[0]}}
                                className={classes.field}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            <ArrowForwardIcon style={{color: COLOR.white}}/>
                            <TextField
                                InputProps={{ classes: {notchedOutline: classes.notchedOutline, focused: classes.focused}} }
                                inputProps={{'min': new Date().toJSON().split("T")[0]}}
                                id="date"
                                label="Zakończ"
                                type="date"
                                variant='outlined'
                                margin='dense'
                                defaultValue={new Date().toJSON().split("T")[0]}
                                className={classes.field}
                                InputLabelProps={{
                                    shrink: true,

                                }}
                            />
                            </div>
                        </Grid></>:<></>}
                        
                    </Grid>
                    <div style={{textAlign: 'center'}}>
                    <Button
                        inputProps={{ className: classes.fieldInput }}
                        className={classes.button}
                        variant="outlined"
                        onClick={handleSubmit}
                        >
                        {props.isEdit?'EDYTUJ WYDARZENIE':'UTWÓRZ WYDARZENIE'}
                
                    </Button>
                                            
                    </div>
                </div>
            </Modal>
        </div>
    );
}