import { Component } from "@/app/config/pages";

export type RearrangeFields = (
  fromPage: string,
  fromField: string,
  toField: string
) => void;

export type PageCardProps = {
  component: Component;
  components: Component[];
  pageIndex: number;
  rearrangeFields: RearrangeFields;
};
