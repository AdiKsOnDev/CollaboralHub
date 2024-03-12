function Project({image, title, id, owner, date}) {
  return (
    <a href={id} className="flex flex-col items-center justify-center mr-5 mb-12 w-52 hover:w-60 hover:text-lg duration-300">
      <img className="w-full h-30 rounded-lg" src={image} alt="Canvas" />
      
      <h1 className="text-text-color text-md font-semibold w-full pl-2 mt-3">{title}</h1>
      <h2 className="text-text-color text-sm font-light italic pl-2 w-full">Accessed by: {owner}</h2>
      <h3 className="text-text-color text-sm font-light italic pl-2 w-full">Last Edited: {date}</h3>
    </a>
  )
};

export default Project;
