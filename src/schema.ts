import * as Yup from "yup";
import { PostRequestOptions, GetRequestOptions } from "./interfaces";

export const getSchema: Yup.ObjectSchema<GetRequestOptions> =
  Yup.object().shape({
    url: Yup.string().required(),
    params: Yup.object(),
    proxy: Yup.string(),
    headers: Yup.object(),
    ssl: Yup.boolean(),
  });

export const postSchema: Yup.ObjectSchema<PostRequestOptions> =
  Yup.object().shape({
    url: Yup.string().required(),
    params: Yup.object(),
    data: Yup.object(),
    proxy: Yup.string(),
    headers: Yup.object(),
    ssl: Yup.boolean(),
  });
