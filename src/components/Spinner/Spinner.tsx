import { Puff } from "react-loader-spinner";
import { ILoaderColor } from "../../utils/interfaces";

interface ISpinner {
  data: string;
  color?: ILoaderColor;
}
const Spinner: React.FC<ISpinner> = ({ data, color='#F3F3F3' }) => {
  const spinnerColor = (color: string) => {
    let loaderColor = "#F3F3F3";
    if (color === "save") loaderColor = "#67e8f9";
    if (color === "delete") loaderColor = "#FF4319";
    if (color === "edit") loaderColor = "#55C0F9";

    return loaderColor;
  };

  return (
    <div
      id={data}
      // className="fixex top-0 left-0 w-full h-full bg-opacity-70 bg-black flex justify-center items-center backdrop-blur-sm"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-blur-sm bg-opacity-70 bg-black"
      style={{ zIndex: "99" }}
    >
      <Puff
        height="80"
        width="80"
        radius={1}
        color={spinnerColor(color)}
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      {/* <div className="border-4 border-opacity-30 border-white rounded-full border-t-[4px] w-10 h-10 animate-spin"></div> */}
    </div>
  );
};

export default Spinner;
