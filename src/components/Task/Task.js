import React, {useEffect} from 'react'

const Task = props => {

  useEffect(()=> {
    console.log(props.match.params.id);
  });

  return(
    <div>
      <h2>Task</h2>
    </div>
  )
};

export default Task;