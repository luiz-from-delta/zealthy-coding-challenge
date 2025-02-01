import { Component } from "@/app/config/pages";

export type PageCardProps = {
  component: Component;
  componentIndex: number;
  components: Component[];
  pageIndex: number;
  rearrangeFields: (
    documentId: string,
    from: { id: string; value: string },
    to: { value: string }
  ) => void;
};
