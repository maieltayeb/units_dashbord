import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import Image from "next/image";
import Slideshow from "./Slideshow";

export default function BasicModal({ srcImg, images }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <img src={srcImg} alt="unitImg" width="50" height="50" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            bgcolor: "background.paper",
            boxShadow: 24,
            width:"80%"
          }}
        >
          <Slideshow items={images} />
        </Box>
      </Modal>
    </div>
  );
}
