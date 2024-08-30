"use client";
import { fetchWrapper } from "@/utils/api";
import { useEffect, useState } from "react";
import { navFnAtom } from "@/store/index";
import { useAtom } from "jotai";
import BookCover from "@/components/bookCover";
import { Pagination } from "@nextui-org/react";

export default function Books() {
  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const [navFunc, setNavFunc] = useAtom(navFnAtom);

  const fetchData = async () => {
    const res = await fetchWrapper(`/api/book?offset=${offset}`);
    if (res.success) {
      setList(res.data);
      setPage(Math.floor(res.total / 10) || 1);
    }
  };

  useEffect(() => {
    fetchData();
    setNavFunc(() => {
      fetchData()
    })
  }, []);

  const changePage = async (e: number) => {
    setOffset(e);
    fetchData();
  };

  return (
    <div className="relative grid grid-cols-5 gap-4 justify-items-center h-full pt-6 auto-rows-auto grid-rows-[230px_230px]">
      {list.map((item: { id: string, name: string }, i: number) => (
        <BookCover key={`${item.id}-${i}`} url={item.name} bookId={item.id}></BookCover>
      ))}
      <Pagination
        isCompact
        showControls
        total={page}
        initialPage={1}
        className="absolute right-24 bottom-24"
        onChange={changePage}
      />
    </div>
  );
}
