import Card from "./card";
import { useEffect, useState } from "react";
import { fetchWrapper } from "../utils/api";
import { showSession } from "@/store";
import { useAtom } from "jotai";

const New = () => {
  const [ session, setS ] = useAtom(showSession)
  const [emptyValue, setEmptyValue] = useState(false)
  const [showValue, setShowValue] = useState(false)

  const fetchData = async (newCard: Boolean) => {
    const res = await fetchWrapper(`/api/card?email=${session?.user?.email}`)
    if (res.success && res.data && (!card || newCard)) {
      setCard(res.data)
    } else if (res.success && !res.data) {
      setEmptyValue(true)
    }
    setShowValue(true)
  }

  useEffect(() => {
    fetchData(false)
  }, [])

  return (
    <div className="w-full h-full flex justify-center items-center">
      {showValue ? emptyValue ? <div>Finish Today</div> : <div className="w-full h-full flex justify-center items-center">
        <Card onNewCard={fetchData}></Card>
      </div> : ''}
    </div>
  );
};

export default New;
