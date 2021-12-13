export type Image = {
  fields: {
    description: string;
    file: {
      url: string;
      details: object;
      fileName: string;
      title: string;
    };
  };
  metadata: object;
  sys: object;
};
