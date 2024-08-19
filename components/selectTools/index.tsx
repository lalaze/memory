import { useState } from "react"
import { selectColorsList } from "@/tailwind.config"

const SelecTools = ({ text }: { text: string }) => {
  const [color, setColor] = useState(selectColorsList[0])
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])

  return <div className="w-40 h-10 px-2 py-2 absolute bg-[#71717A] rounded-lg flex justify-around items-center">
    {selectColorsList.map((color) => <div key={color} className={`w-5 h-5 rounded-[50%]`} style={{
      backgroundColor: color,
    }}></div>)}
  </div>
}

export default SelecTools
