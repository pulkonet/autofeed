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
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

type Link = {
  link: string;
  createdAt: string;
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
      .gte("created_at", sevenDaysAgo.toISOString());

    if (error) {
      console.error("Error fetching notes:", error);
    }

    console.info({ links });

    const out: Link[] =
      links?.map((i) => {
        return {
          link: i.link ?? "",
          createdAt: i.created_at,
        };
      }) ?? [];
    console.info({ out });

    return out;
  } catch (e) {
    console.error(e);
    return [];
  }
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

  console.info("out", { links });

  return (
    <div>
      Good Morning {router.query.userId}, here are your links from past seven
      days!
      <Table>
        <TableHeader>
          <TableColumn>Link</TableColumn>
          <TableColumn>Created At </TableColumn>
        </TableHeader>
        <TableBody>
          {links.map((i) => (
            <TableRow key={i.link}>
              <TableCell>
                <a href={i.link} target="_blank">
                  {i.link}
                </a>
              </TableCell>
              <TableCell>{i.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
