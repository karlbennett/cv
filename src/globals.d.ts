declare module "*.svg";

declare module "*.md" {
  const content: string;
  export default content;
}

declare module "*.js" {
  export const details: Details;
}

declare interface Details {
  email: string;
  phone: string;
  address: {
    url: string;
    text: string;
  };
  website: {
    url: string;
    text: string;
  };
}

declare interface Personal {
  hasPersonal: boolean;
  details: Details;
}

