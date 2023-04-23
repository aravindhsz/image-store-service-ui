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

export default function AddImageModal(props) {
  const [formDataName, setName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState(null);

  React.useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);

  const triggerCreateApi = async (formDataName, image) => {
    let data = new FormData();
    data.append('data', image, image.name);
    data.append('name', formDataName);
    const response = await axios.post("/api/album/" + props.albumId + "/image" , data,{
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data;`,
        }
      });
    if (response.status === 200) {
      props.closeModal();
    }
  };

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
            <>
              <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: "none" }}
                onChange={(e) => setImage(e.target.files[0])}
              />
              {!(imageUrl && image) && (
                <label htmlFor="select-image">
                  <Button variant="contained" color="primary" component="span">
                    Upload Image
                  </Button>
                </label>
              )}
            </>

            {imageUrl && image && (
              <Box mt={2} boxSizing={"inherit"} textAlign="center">
                <img src={imageUrl} alt={image.name} height="100%" width="100%" />
              </Box>
            )}
          </Box>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                triggerCreateApi(formDataName, image);
              }}
              size="large"
              variant="contained"
              color="success"
              sx={{ margin: "1rem" }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
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
