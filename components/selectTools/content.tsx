import { Textarea } from "@nextui-org/react";
import { throttle } from "lodash";
import { updateSelection } from "@/utils/selection";
import { useAtom } from "jotai";
import { selectToolsStateAtom } from "@/store/index";
import { useState, useEffect, useCallback } from "react";

const SelectContent = ({ content }: { content: string }) => {
  const [value, setValue] = useState(content)
  const [sState, setState] = useAtom(selectToolsStateAtom);

  const update = useCallback(throttle((nextValue: string) => {
    updateSelection(sState.id, {
      ...sState,
      content: nextValue
    })
  }, 500, { leading: false, trailing: true }), [])

  useEffect(() => {
    return () => {
      update.cancel()
    };
  }, [update]);

  return <div className="w-64">
    <Textarea type="text"
      onValueChange={(v: string) => {
        setValue(v)
        update(v)
      }}
      value={value}
      fullWidth label="Content" placeholder="Enter your content" />
  </div>
}

export default SelectContent
