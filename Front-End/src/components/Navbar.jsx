const Navbar = () => {
  return (
    <div className=' items-center flex justify-between p-2 pl-4 bg-black'>
    <div className=' text-white italic'>T⭕ < span className='ml-1' >D⭕</span> </div>
    <div><label className='text-white mr-2' htmlFor="filter"> Priority</label> <select name="filter" id="">
      <option value="all">All</option>
      <option value="all">High</option>
      <option value="all">Medium</option>
      <option value="all">Low</option>
    </select></div>
  </div>
  )
}

export default Navbar