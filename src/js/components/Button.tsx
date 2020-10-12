import React from "react";
import cs from "classnames";

interface P {
	onClick: () => void;
	btnWrapClasses?: string;
}

/** .calc__btn-wrap is needed to keep flex children correctly adjustable in width, together with border width; */
const Button: React.FC<P> = (p) => {
	return (
		<div className={cs("calc__btn-wrap", p.btnWrapClasses)}>
			<button type="button" className="calc__btn" onClick={p.onClick} data-symbol={p.children}>
				{p.children}
			</button>
		</div>
	);
};
export default Button;
