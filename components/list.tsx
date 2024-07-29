import { useEffect, useState } from "react";
import showToast from "./toast";
import { Cards } from "../models/cards";
import { fetchWrapper } from "../utils/api";
import { useGlobalState } from './view'

const List = () => {
  const [listValue, setListValue] = useState([]);
  const { setComponentName, setCard, session, searchValue } = useGlobalState();
  const [showValue, setShowValue] = useState(false)

  const fetchData = async () => {
    if (searchValue) {
      try {
        const res = await fetchWrapper("/api/search", {
          method: "POST",
          body: JSON.stringify({
            content: searchValue,
          }),
        });
        if (res.success) {
          setListValue(res.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      const res = await fetchWrapper(`/api/cards?email=${session.user?.email}`)
      if (res.success) {
        setListValue(res.data);
      } else {
        showToast("Failed to fetch data", "error");
      }
    }
    setShowValue(true)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (o: Cards) => {
    setComponentName('edit')
    setCard(o)
  }

  const handleDeleteClick = async (o: Cards) => {
    const res = await fetchWrapper(`/api/delete?id=${o._id}&email=${session.user?.email}`)
    if (res.success) {
      fetchData()
      showToast('delete Success', 'success')
    }
  }

  return (
    <div className="flex justify-center align-top">
      {showValue ? <div className="overflow-x-auto mt-6 w-5/6 h-5/6">
        <table className="table">
          <thead>
            <tr>
              <th className="w-2"></th>
              <th>Title</th>
              <th className="w-32">Next Day</th>
              <th className="w-24">Review Time</th>
              <th className="w-24"></th>
            </tr>
          </thead>
          <tbody>
            {listValue.map((item: Cards, i) => (
              <tr key={i} className="hover:bg-base-100">
                <th>{i + 1}</th>
                <td>{item.title}</td>
                <td>{item.nextDay}</td>
                <td>{item.time}</td>
                <td className="flex">
                  <button className="btn btn-square btn-ghost bg-edit-icon bg-contain btn-xs mr-2 cursor-pointer" onClick={() => handleEditClick(item)}></button>
                  <button className="btn btn-square btn-ghost bg-delte-icon bg-contain btn-xs cursor-pointer" onClick={() => handleDeleteClick(item)}></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {listValue.length === 0 && <div className="text-base text-nowrap m-auto text-center mt-52 font-table">no Data</div>}
      </div> : ''}
    </div>
  );
};

export default List;
