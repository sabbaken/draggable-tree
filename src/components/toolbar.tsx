import React from "react";
import Card from "./card.tsx";
import {Button} from "./button.tsx";
import {Redo2Icon, RotateCcwIcon, Undo2Icon} from "lucide-react";
import {useDispatch} from "react-redux";

const Toolbar: React.FC = () => {
  const dispatch = useDispatch();

  const handleUndo = () => {
    // dispatch(undo())
  };

  const handleRedo = () => {
    // dispatch(redo())
  };

  const handleReset = () => {
    // dispatch(resetGame())
  };

  return (
    <div className="flex flex-col gap-4 absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
      <Card className="flex flex-col gap-1">
        <Button variant="ghost"
                size="squareMd"
                onClick={handleUndo}
                children={<Undo2Icon />}
        />
        <Button variant="ghost"
                size="squareMd"
                onClick={handleRedo}
                children={<Redo2Icon />} />
        <Button variant="ghost"
                size="squareMd"
                onClick={handleReset}
                children={<RotateCcwIcon />} />
      </Card>
    </div>
  );
};

export default Toolbar;