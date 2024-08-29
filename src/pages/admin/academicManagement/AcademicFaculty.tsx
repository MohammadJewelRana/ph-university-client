import { Button, Table, TableColumnsType, TableProps } from "antd";

import { useState } from "react";
import { TAcademicFaculty, TAcademicSemester } from "../../../types/academicManagement.type";
import { TQueryParam } from "../../../types/global";
import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/AcademicSemesterApi";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";

export type TTableData = Pick<
  TAcademicFaculty,
  "name"
>;

const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data,
    isLoading,
    isFetching,
  } = useGetAcademicFacultiesQuery(params);

  // console.log({ isLoading, isFetching });
   
  const academicFacultyData=data?.data;

  console.log(academicFacultyData);
  

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Faculty name",
      key: "facultyName",
      dataIndex: "name",
    },

    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
            <Button>Delete</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
     
    }
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={academicFacultyData}
      onChange={onChange}
    />
  );
};

export default AcademicFaculty;
