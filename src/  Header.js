import React, { useEffect, useState } from 'react';


const Headers =()=>{
    return <div className='conditions'>
         <div>Conditions:</div>
         <div> - Column Name should match with the template name which needs to be replaced.Follow below pattern.</div>
         <div> - Example: I have a column "Full Name", in template it should be {`{full_name}`}</div>
    </div>
}
export default Headers