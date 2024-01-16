function Canvas({image, title}) {
  return (
    <div className="flex flex-col items-center justify-center w-48">
      <img className="w-full rounded-lg" src={image} alt="Canvas" />

      <h1 className="text-text-color font-semibold w-full pl-2 mt-3">{title}</h1>
    </div>
  )
};

export default Canvas;
