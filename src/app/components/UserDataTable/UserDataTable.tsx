import { formatDate } from "@/app/utils/date";
import { Columns, UserDataTableProps } from "./UserDataTable.types";
import { TruncatedText } from "./TruncatedText";
import { tableColumnWidthMap } from "@/app/config/table";
import cx from "classnames";

const columns: Columns = {
  id: {
    key: "id",
    name: "ID",
    format: (data) => {
      return data;
    },
  },
  email: {
    key: "email",
    name: "Email",
    format: (data) => {
      return data;
    },
  },
  address: {
    key: "address",
    name: "Address",
    format: (data) => {
      if (!data) {
        return "-";
      }

      const { city, state, streetAddress, zipCode } = data;

      return (
        <TruncatedText
          content={`${streetAddress}, ${city}, ${state}, ZIP: ${zipCode}`}
        />
      );
    },
  },
  birthDate: {
    key: "birthDate",
    name: "Birth Date",
    format: (data) => {
      return data ? formatDate(data) : "-";
    },
  },
  aboutMe: {
    key: "aboutMe",
    name: "About Me",
    format: (data) => {
      return <TruncatedText content={data || "-"} />;
    },
  },
  createdAt: {
    key: "createdAt",
    name: "Registered At",
    format: (data) => {
      return data ? formatDate(data) : "-";
    },
  },
};

export function UserDataTable({ data }: UserDataTableProps) {
  return (
    <table className="table-fixed border border-table-border text-xs">
      <thead>
        <tr>
          {Object.values(columns).map((column) => (
            <th
              key={column.key}
              style={{ width: tableColumnWidthMap[column.key] }}
              className="text-center px-3 h-[50px] bg-table-header"
            >
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={row.id}>
            {Object.values(columns).map((column) => (
              <td
                key={`${row.id}-${column.key}`}
                style={{ width: tableColumnWidthMap[column.key] }}
                className={cx(
                  "text-center px-3 h-[50px]",
                  rowIndex % 2 ? "bg-table-row-odd" : "bg-table-row-even"
                )}
              >
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                {column.format(row[column.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
