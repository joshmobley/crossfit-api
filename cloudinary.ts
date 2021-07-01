import cloudinary, { UploadApiResponse } from "cloudinary";

const uploadImage = (data: string): Promise<UploadApiResponse> =>
  cloudinary.v2.uploader.upload(data, (err) => {
    if (err) {
      console.log(err);
      throw "upload failed";
    }
  });

export { uploadImage };
