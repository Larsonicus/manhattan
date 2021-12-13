import { Date, Image, Title } from '.';

export type Post = {
  title: Title;
  text: string;
  image: Image;
  monthYear: string;
  date: Date;
};
