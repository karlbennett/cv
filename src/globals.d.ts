declare module "*.svg";

declare module "*.md" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const content: Details;
  export default content;
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

