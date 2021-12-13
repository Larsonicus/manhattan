import { Metadata, Sys } from "contentful";
import { Post } from ".";

export type Item = {
  fields: Post,
  metadata: Metadata,
  sys: Sys,
}