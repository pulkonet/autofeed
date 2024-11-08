"use client";

import { supabase } from "@/app/api/client/supabase";
import Header from "@/components/Header";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Link = {
  link: string;
  createdAt: string;
  bookmarked: boolean;
};

const columnHelper = createColumnHelper<Link>();

const columns = [
  columnHelper.accessor("link", {
    header: "Link",
    cell: (info) => (
      <a
        href={info.getValue()}
        target="_blank"
        rel="noopener noreferrer"
        className="link truncated"
      >
        {info.getValue()}
      </a>
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => getHRDateTime(info.getValue()),
  }),
  columnHelper.accessor("bookmarked", {
    header: "Status",
    cell: (info) => info.getValue() ? (
      <span className="status-bookmarked">Bookmarked</span>
    ) : (
      <span className="status-default">-</span>
    ),
  }),
];

const getLinks = async (userId: string): Promise<Link[]> => {
  try {
    const userIdInt = parseInt(userId);

    if (Number.isNaN(userIdInt)) {
      console.error("Parsed userIdInt in NaN", userId, userIdInt);
      return [];
    }
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: links, error } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", userIdInt)
      .or(`created_at.gte.${sevenDaysAgo.toISOString()}, bookmarked.eq.true`)
      .order("created_at");

    if (error) {
      console.error("Error fetching notes:", error);
    }

    // console.info({ links });

    const out: Link[] =
      links?.map((i) => {
        return {
          link: i.link ?? "",
          createdAt: i.created_at,
          bookmarked: i.bookmarked,
        };
      }) ?? [];

    return out;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getHRDateTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid dateTimeString");
  }

  // Format the date and time
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  // Use toLocaleString to get the formatted string
  const formattedDateTime = date.toLocaleString("en-IN", options);

  return formattedDateTime;
};

export default function UserPage() {
  const router = useRouter();
  const userId = router.query.userId;
  const [links, setLinks] = useState<Link[]>([]);

  const table = useReactTable({
    data: links,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (userId !== undefined) {
      getLinks(userId as string).then((out) => {
        setLinks(out);
      });
    }
  }, [userId]);

  if (userId === undefined) {
    return <div>Undefined user id, something went wrong somewhere;</div>;
  }

  return (
    <>
      <Header
        title={`Welcome back, ${router.query.userId}!`}
        subtitle="Here are your links from the past seven days"
      >
        <Link
          className="button with-icon"
          target="_blank"
          href={`/users/${router.query.userId}/feed.xml`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1" />
          </svg>
          RSS Feed
        </Link>
      </Header>

      <div className="container">
        <div className="table-container">
          <table className="data-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="table-header">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="table-row">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="table-cell">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
