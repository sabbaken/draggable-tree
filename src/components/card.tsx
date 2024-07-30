import React from "react";
import cn from "classnames";

type TProps = {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

const Card: React.FC<TProps> = ({children, className, style}) => {
  return (
    <div style={style} className={cn(className, "bg-white rounded-lg p-1 border border-gray-300")}>
      {children}
    </div>
  );
};

export default Card;