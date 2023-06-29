import Resizer from "react-image-file-resizer";

export const resizeFile = (file:File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      50,
      50,
      "JPEG",
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });