import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Container, TextField } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateAlbumModal(props) {
  const [formDataName, setName] = React.useState("");
  const [formDataDescription, setDescription] = React.useState("");


const triggerCreateApi = async (formDataName, formDataDescription) => {
  const response = await axios.post("/api/album",{"name" : formDataName, "description" : formDataDescription})
  if (response.status === 200) {
    props.closeModal();
  }
}


  return (
    <div>
      <Modal
        open={true}
        onClose={props.closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container style={{ justifyContent: "center" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
            >
              Create Album
            </Typography>
          </Container>
          <Box sx={{ padding: "1rem", paddingLeft: "30%" }}>
            <TextField
              value={formDataName}
              onChange={(event) => {
                setName(event.target.value);
              }}
              label="Name"
              id="name"
              sx={{ margin: "2rem" }}
            />
            <br></br>

            <TextField
              label="Description"
              id="name"
              sx={{ margin: "2rem", marginTop: 0 }}
              multiline
              value={formDataDescription}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </Box>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                triggerCreateApi(formDataName,formDataDescription);
              }}
              size="large"
              variant="contained"
              color="success"
              sx={{ margin: "1rem" }}
            >
              Save
            </Button>
            <Button
              onClick={ () => {
                props.closeModal();
              }}
              size="large"
              variant="outlined"
              color="error"
              sx={{ margin: "1rem" }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
