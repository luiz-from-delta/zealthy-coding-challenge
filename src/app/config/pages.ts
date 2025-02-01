export type Component = { name: string; isFixed?: boolean };

export type Page = {
  title: string;
  components: Component[];
};

export const pages: Page[] = [
  {
    components: [
      {
        isFixed: true,
        name: "Email",
      },
      {
        isFixed: true,
        name: "Password",
      },
    ],
    title: "First Page",
  },
  {
    components: [],
    title: "Second Page",
  },
  {
    components: [],
    title: "Third Page",
  },
];
