import CompletedExerciseRepository from "../repository/CompletedExerciseRepository.jsx";

function Table({completedExercises, headers, setFlag}) {

    const deleteButtonHandler = (event) => {
        event.preventDefault();
        const exerciseId = event.target.value
        CompletedExerciseRepository.delete(exerciseId);
        setFlag(1);
    }

    return (
        <table className="table border border-1 table-hover">
            <thead>
            <tr>
                {headers.map((header) => {
                    return <th key={header}  scope="col">{header}</th>
                })}
            </tr>
            </thead>
            <tbody>
            {
                completedExercises.map((exercise) => {
                    return (
                    <tr key={exercise.id}>
                        <th scope="row">{exercise.id}</th>
                        <td>{exercise.name_exercise}</td>
                        <td>{exercise.muscle_group.muscle_group}</td>
                        <td>{exercise.date_of_completion}</td>
                        <td>{exercise.number_of_approaches}</td>
                        <td>{exercise.avg_number_of_repetitions}</td>
                        <td><button value={exercise.id} onClick={deleteButtonHandler} className="btn btn-danger">Delete</button></td>
                    </tr>)
                })
            }
            </tbody>
        </table>
    );
}

export default Table;
