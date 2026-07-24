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
    link: string;
    text: string;
  };
  website: string;
}

declare interface Personal {
  hasPersonal: boolean;
  details: Details;
}

