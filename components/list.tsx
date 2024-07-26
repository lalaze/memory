import { useEffect, useState } from "react";
import showToast from "./toast";
import { Cards } from "../models/cards";
import { fetchWrapper } from "../utils/api";
import { useGlobalState } from './view'

const List = () => {
  const [listValue, setListValue] = useState([]);
  const { setComponentName, setCard } = useGlobalState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchWrapper("/api/cards");
      if (res.success) {
        setListValue(res.data);
      } else {
        showToast("Failed to fetch data", "error");
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (o: Cards) => {
    setComponentName('edit')
    setCard(o)
  }

  return (
    <div className="flex justify-center align-top">
      <div className="overflow-x-auto mt-6 w-5/6 h-5/6">
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
                  <button className="btn btn-square btn-ghost bg-delte-icon bg-contain btn-xs cursor-pointer"></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
