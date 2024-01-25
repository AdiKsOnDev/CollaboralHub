function SavedNotes({img, heading}) {
    return (
      <div className="relative">
        <img className="w-full h-auto" src={img} alt="sticky_note" />
        
        <div className="absolute inset-x-0 top-0 flex items-center justify-center bg-black bg-opacity-50">
        <p className="text-text-color font-regular">{heading}</p>
      </div>
      </div>
    )
  };
  
  export default SavedNotes;