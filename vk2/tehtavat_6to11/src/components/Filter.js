import React from 'react'



const Filter = ({ filter, handleFilterChange }) =>
<>
    filter names with <input value={filter} onChange={handleFilterChange} />
</>

export default Filter