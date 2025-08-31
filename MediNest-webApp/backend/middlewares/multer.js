// import multer from "multer";

// const storage = multer.diskStorage({
//   filename: function(req, file, callback) {
//     console.log("🔍 Multer filename called with file:", file);
//     callback(null, file.originalname);
//   }
// });

// const upload = multer({ storage });

// // Simple export - no debugging wrapper
// export default upload;

import multer from "multer";

// Store file in memory instead of local folder
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
