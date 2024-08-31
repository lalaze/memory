"use client";
import { selectionListOffset } from '@/utils/selection'
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from "next/navigation";
import { SelectionList } from '@/models/selection'
import { Pagination, Divider, Card, CardHeader, CardBody } from "@nextui-org/react"

export default function Note() {
  const [offset, setOffset] = useState(0)
  const [selections, setSelections] = useState<SelectionList[]>([])
  // const [page, setPage] = useState(0)
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const bookId = searchParams.get('bookId') || ''
  const file = (pathname.split("/").pop() as String).split('?')[0] || ''

  const fetchSelections = async () => {
    // data: SelectionList[]
    const { data, total } = await selectionListOffset(file, bookId, offset)
    setSelections(data)
    // setPage(Math.floor(total / 10) || 1);
  }

  const changePage = async (e: number) => {
    setOffset(e);
    fetchSelections();
  }

  useEffect(() => {
    fetchSelections()
  }, [])
  // overflow-auto h-full w-full p-6 columns-1 xs:columns-1 sm:columns-3 md:columns-4 lg:columns-5 2xl:columns-6
  return <div className='overflow-auto w-full columns-3'>
    {selections.map((item) => <Card className="mb-4" key={item.id}>
      <CardHeader>
        {item.text}
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{item.content}</p>
      </CardBody>
    </Card>)}
  </div>;
}
