"use client";

import { supabase } from "@/app/api/client/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

type Link = {
  link: string;
  createdAt: string;
  bookmarked: boolean;
};

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          Good Morning {router.query.userId}, here are your links from past
          seven days!
          <br />
          <Link target="_blank" href={`/users/${router.query.userId}/feed.xml`}>
            rss
          </Link>
          <Table>
            <TableHeader>
              <TableColumn>Link</TableColumn>
              <TableColumn>Created At </TableColumn>
              <TableColumn>Bookmarked</TableColumn>
            </TableHeader>
            <TableBody>
              {links.map((i) => (
                <TableRow key={i.link}>
                  <TableCell>
                    <a href={i.link} target="_blank">
                      {i.link}
                    </a>
                  </TableCell>
                  <TableCell>{getHRDateTime(i.createdAt)}</TableCell>
                  <TableCell>{i.bookmarked ? "True" : "False"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
