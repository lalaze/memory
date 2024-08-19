import { useState, useEffect } from "react"
import { selectColorsList } from "@/tailwind.config"
import { useAtom } from "jotai"
import { selectToolsStateAtom } from "@/store/index"

const SelecTools = () => {
  const [color, setColor] = useState(selectColorsList[0])
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<String[]>([])
  const [text, setText] = useState('')
  const [toolsState, setToolsState] = useAtom(selectToolsStateAtom)

  useEffect(() => {
    setColor(toolsState.nowColor)
    setContent(toolsState.content)
    setTags(toolsState.tags)
    setText(toolsState.text)
  }, [toolsState])

  return <div className="w-40 h-10 px-2 py-2 absolute bg-[#71717A] rounded-lg flex justify-around items-center">

    {selectColorsList.map((c, i) => <div className={`px-2 ${i === selectColorsList.length - 1 ? 'border-0' : 'border-r-2'}`}>
      <div key={c} className={`w-5 h-5 rounded-[50%] ${c === color && 'border' }`} style={{
        backgroundColor: c,
      }}></div>
    </div>)}
  </div>
}

export default SelecTools
