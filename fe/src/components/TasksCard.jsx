import TasksSingleCard from './TasksSingleCard';


const TasksCard = ({ tasks }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {tasks.map((item) => (
        <TasksSingleCard key={item._id} task={item} />
      ))}
    </div>
  );
};

export default TasksCard;