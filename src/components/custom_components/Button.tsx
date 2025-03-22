import { ButtonType } from "../../models/types";

const getButtonClassNames = (
    type: ButtonType,
    extras: string,
    isDisabled: boolean,
) => {
    const generalFormat = `text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 ${isDisabled ? "cursor-not-allowed bg-slate-500 opacity-50" : "cursor-pointer opacity-75 hover:opacity-100"}`;
    if (type === "submit") {
        return `bg-blue-500 ${generalFormat} ${extras}`;
    } else if (type === "clear") {
        return `bg-red-600 ${generalFormat} ${extras}`;
    } else if(type === "success") {
        return `bg-green-600 ${generalFormat} ${extras}`;
    }
    return generalFormat;
};

export const Button = ({
    type,
    placeHolder,
    extras,
    isDisabled,
    handleButtonClick,
}: {
    type: ButtonType;
    placeHolder: string;
    extras: string;
    isDisabled: boolean;
    handleButtonClick: () => void;
}) => {
    return (
        <button
            className={getButtonClassNames(type, extras, isDisabled)}
            disabled={isDisabled}
            onClick={handleButtonClick}
        >
            {placeHolder}
        </button>
    );
};
