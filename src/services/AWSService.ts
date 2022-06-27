import aws, { S3 } from "aws-sdk";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

interface IUploadRequest {
    filePath: string;
    fileName: string;
}

export interface IFile {
    url: string;
    description: string;
    name: string;
}

class AWSService {
    private client: S3;

    constructor() {
        this.client = new S3({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
            region: process.env.AWS_REGION,
            apiVersion: "latest",
        });
    }

    async uploadFile({ filePath, fileName }: IUploadRequest): Promise<string> {
        const fileContent = fs.readFileSync(filePath);

        const params = {
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: fileName,
            Body: fileContent,
        };

        const data = await this.client.upload(params).promise();

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return data.Location;
    }
    async deleteFile(path: string): Promise<void> {
        if (path !== "") {
            const key = path.replace(
                `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/`,
                "",
            );
            const params = {
                Bucket: process.env.AWS_S3_BUCKET!,
                Key: key,
            };
            await this.client.deleteObject(params).promise();
        }
    }

}

export default AWSService;
