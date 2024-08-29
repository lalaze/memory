import { Textarea } from "@nextui-org/react";
import { throttle } from "lodash";
import { updateSelection } from "@/utils/selection";
import { useAtom } from "jotai";
import { selectToolsStateAtom } from "@/store/index";

const SelectContent = ({ content }: { content: string }) => {
  const [sState, setState] = useAtom(selectToolsStateAtom);

  const save = throttle((value: string) => {
    updateSelection(sState.id, {
      ...sState,
      content: value
    })
  }, 500, { leading: false, trailing: true })

  return <div className="w-64">
    <Textarea type="text"
      onValueChange={(value) => save(value)}
      // onValueChange={}
      value={content}
      fullWidth label="Content" placeholder="Enter your content" />
  </div>
}

export default SelectContent
