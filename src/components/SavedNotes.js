function SavedNotes({img, heading}) {
    return (
      <div className="flex flex-col items-center justify-center mr-5 w-48 hover:w-52 hover:text-lg duration-300">
        <img className="w-full rounded-lg" src={img} alt="sticky_note" />
        
        <h1 className="text-text-color font-regular w-full pl-2 mt-3 mb-8">{heading}</h1>
      </div>
    )
  };
  
  export default SavedNotes;