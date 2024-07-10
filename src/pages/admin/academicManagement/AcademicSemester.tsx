import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/AcademicSemesterApi"

 

const AcademicSemester = () => {

    const {data}=useGetAllSemestersQuery(undefined)
    console.log(data);
    

  return (
    <div>
      AcademicSemester
    </div>
  )
}

export default AcademicSemester
