import React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({ open, onClose, selectedId }) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" ,backgroundColor:"var(--orange-color)"}} className="anshuman" >
        <Toolbar >
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Details for ID: {selectedId}
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="body1" sx={{ p: 2 }}>
        Here you can display detailed information for the selected ID: {selectedId}.
      </Typography>
    </Dialog>
  );
};

export default FullScreenDialog;
