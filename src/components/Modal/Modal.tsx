import { IModalType } from "../../utils/interfaces";

interface IModal {
  onPrimaryAction: () => void;
  onSecondaryAction?: () => void;
  data: {
    title: string;
    textButton: string;
    descripton?: string;
    textSecondaryButton?: string;
    icon?: string;
    type: IModalType;
  };
}
const Modal: React.FC<IModal> = ({
  onPrimaryAction,
  onSecondaryAction,
  data,
}) => {
  const backgroundType = (type: string) => {
    let customStyle = "bg-blue-500";
    if (type === "success") customStyle = "bg-green-400 hover:bg-green-600";
    if (type === "alert") customStyle = "bg-yellow-400 hover:bg-yellow-600";
    if (type === "error") customStyle = "bg-red-400 hover:bg-red-600";

    return customStyle;
  };

  const customIcon = (type: string) => {
    let icon = "/img/success.svg";
    if (type === "error") icon = "/img/error.svg";
    if (type === "alert") icon = "/img/warning.png";
    return icon;
  };

  const customBorder = (type: string) => {
    let border = "border-blue-400  hover:bg-blue-600";
    if (type === "success") border = "border-green-400 text-green-400 hover:bg-green-100";
    if (type === "alert") border = "border-yellow-400 text-yellow-800 hover:bg-yellow-100";
    if (type === "error") border = "border-red-400 text-red-400 hover:bg-red-100";
    return border;
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-blur-sm`}
    >
      <div className="bg-white w-full mx-5 md:w-1/3 h-auto py-8 rounded-lg shadow-lg backdrop-blur-md backdrop-filter flex flex-col gap-3 items-center justify-center md:px-14">
        <h2 className="font-semibold text-gray-700 text-3xl">{data.title}</h2>
        <img
          src={customIcon(data.type)}
          alt={data.type}
          className="w-14 h-14 md:w-16 md:h-16 mt-5"
        />
        <p className="text-xs md:text-lg my-5">{data.descripton}</p>
        <div className="flex flex-col md:flex-row gap-2 justify-center md:items-center ">
          <button
            onClick={onPrimaryAction}
            className={`${backgroundType(
              data.type
            )} text-white px-4 py-2 rounded-md border-gre w-80 ${!data.textSecondaryButton ? 'md:w-80' : 'md:w-40'}`}
          >
            {data.textButton}
          </button>

          {data.textSecondaryButton && (
            <button
              onClick={onSecondaryAction}
              className={`bg-white ${customBorder(
                data.type
              )} border-2  px-4 py-2 rounded-md hover:bg-blue-600 md:w-40`}
            >
              {data.textSecondaryButton}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
