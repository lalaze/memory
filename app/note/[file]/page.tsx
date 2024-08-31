"use client";
import { selectionListOffset } from '@/utils/selection'
import { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from "next/navigation";
import { SelectionList } from '@/models/selection'
import { Pagination, Divider, Card, CardHeader, CardBody } from "@nextui-org/react"

export default function Note() {
  const [offset, setOffset] = useState(0)
  const [end, setEnd] = useState(false)
  const [selections, setSelections] = useState<SelectionList[]>([])
  // const [page, setPage] = useState(0)
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const bookId = searchParams.get('bookId') || ''
  const file = (pathname.split("/").pop() as String).split('?')[0] || ''

  const fetchSelections = async () => {
    const { data, total } = await selectionListOffset(file, bookId, offset)
    setSelections(selections.concat(data))
    setOffset(offset + 50)
    if (data.lenngth === 0) {
      setEnd(true)
    }
  }

  useEffect(() => {
    fetchSelections()
  }, [])

  const scrollRef: any = useRef(null)
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight && !end) {
      console.log('Scrolled to bottom!')
      fetchSelections()
    }
  }

  return <div className='h-full overflow-auto' onScroll={handleScroll} ref={scrollRef}>
    <div className='w-full p-6 columns-1 xs:columns-1 sm:columns-3 md:columns-4 lg:columns-5 2xl:columns-6'>
      {selections.map((item) => <Card className="mb-4" key={item.id}>
        <CardHeader>
          {item.text}
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{item.content}</p>
        </CardBody>
      </Card>)}
    </div>
  </div>;
}
