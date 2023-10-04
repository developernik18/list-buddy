export default function ConfirmationBox({
  deleteFunction,
  cancelFunction,
  confirmationStatement,
  extraInfo,
  pending,
}: {
  deleteFunction: () => void;
  cancelFunction: () => void;
  confirmationStatement: string,
  extraInfo: string,
  pending: boolean
}) {
  return (
    <div
      className="backdrop bg-translucent-black-500 fixed 
      top-0 left-0 right-0 bottom-0 z-10 p-5 
      flex justify-center items-center"
    >
      <div className="w-full bg-white min-h-40 rounded max-w-xl p-10 flex flex-col gap-5">
        <h3 className=" text-2xl text-gray-900 text-center">
          {confirmationStatement}
        </h3>
        <div className="button-group flex justify-center items-center gap-10">
          <button 
            className={pending ? "disabled-button" : "danger-outline-button" }  
            onClick={deleteFunction}
            disabled={pending}
          >
            {!pending && (
              <span>
                Yes
              </span>
            )}
            {pending && (
              <span>
                Processing...
              </span>
            )}
            
          </button>
          <button 
            className={pending ? "disabled-button" : "neutral-outline-button" }
            onClick={cancelFunction}
            disabled={pending}
          >
            No
          </button>
        </div>

        {extraInfo && (
          <div className="text-sm text-gray-500 font-normal">
            Note: {extraInfo}
          </div>
        )}
      </div>
    </div>
  );
}
