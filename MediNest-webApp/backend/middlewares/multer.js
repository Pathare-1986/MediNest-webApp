
import multer from "multer";

// Store file in memory instead of local folder
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
