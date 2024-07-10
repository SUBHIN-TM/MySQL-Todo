const Navbar = ({filterChange}) => {

const handleFilterChange = (event) => {
    filterChange(event.target.value); // Call filterChange with the selected option value
  };


  return (
    <div className=' items-center flex justify-between p-2 pl-4 bg-black'>
    <div className=' text-white italic font-semibold text-xl'>Quick Tasks</div>
    <div><label className='text-white mr-2' htmlFor="filter"> Priority</label> 
    <select name="filter" id="filter"  onChange={handleFilterChange} >
      <option value="all">All</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select></div>
  </div>
  )
}

export default Navbar