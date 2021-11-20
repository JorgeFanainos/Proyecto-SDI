import React from "react";
import "./tarjetapsico.css";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const TarjetaPsico = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div className="especialistaCard-1">
        <div className="espBox-1">
          <div>
            <img
              src={props.especialista.img}
              alt="Not found"
              className="imagen-especialista"
            />
          </div>
          <p className="espInfo-1"></p>
        </div>
        <div className="espBox-1">
          <a
            className="espInfo-1"
            title={props.especialista.name}
            onClick={handleClickOpen}
          >
            {props.especialista.name}
          </a>
        </div>
        <div>Especialidades:</div>
        <div className="">{props.especialista.especialidad[0]}</div>
        <div className="">{props.especialista.especialidad[1]}</div>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Historial del Paciente</DialogTitle>
        <DialogContent>
          <DialogContentText>Edite el Contenido</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="nombre1"
            label="nombre"
            type="textarea"
            value={props.especialista.name}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email1"
            label="Email"
            type="email"
            value={props.especialista.email}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="tlf"
            name="tlf"
            label="Telefono"
            type="textarea"
            value={props.especialista.phoneNumber}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="date"
            name="date"
            label="Especialidad"
            type="textarea"
            value={
              (props.especialista.especialidad[0],
              props.especialista.especialidad[0])
            }
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="historial"
            name="info1"
            label="Bio"
            type="textarea"
            value={props.especialista.bio}
            fullWidth
            multiline
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button href="/agendarcita">Agendar Cita</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// {/* <div className="choiceEspBox">
// <button type="button" className="aceptarEsp" onClick={props.handleAccept}></button>
// <button type="button" className="rechazarEsp" onClick={props.handleReject}></button>
// </div> */}

export default TarjetaPsico;
