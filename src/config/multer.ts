import crypto from "crypto";
import { existsSync } from "fs";
import multer from "multer";
import path from "path";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
    directory: tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(32).toString("hex");
            const fileName = `${fileHash}.${file.originalname.substring(
                file.originalname.lastIndexOf(".") + 1,
            )}`;
            return callback(null, fileName);
        },
    }),
};