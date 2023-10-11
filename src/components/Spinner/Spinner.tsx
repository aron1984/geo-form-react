import { Puff } from "react-loader-spinner";

interface ISpinner {
  data: string;
}
const Spinner: React.FC<ISpinner> = ({ data }) => {
  console.log(data);

  return (
    <div
      id="spinner-overlay"
      // className="fixex top-0 left-0 w-full h-full bg-opacity-70 bg-black flex justify-center items-center backdrop-blur-sm"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-blur-sm bg-opacity-70 bg-black"
      style={{ zIndex: "99" }}
    >
      <Puff
        height="80"
        width="80"
        radius={1}
        color="#67e8f9"
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
