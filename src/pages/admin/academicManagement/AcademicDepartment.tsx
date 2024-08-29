import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState, useMemo } from "react";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { TQueryParam } from "../../../types/global";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";

export type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data, isFetching } = useGetAcademicDepartmentsQuery(params);
  
  console.log(params);
  
  const academicDepartmentData = data?.data;

  // Generate dynamic filters for Faculty Name column
  const facultyNameFilters = useMemo(() => {
    const facultyNames = academicDepartmentData?.map(
      (department) => department.academicFaculty?.name
    );
    const uniqueFacultyNames = [...new Set(facultyNames)].filter(Boolean);

    return uniqueFacultyNames.map((name) => ({
      text: name,
      value: name,
    }));
  }, [academicDepartmentData]);

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Faculty Name",
      key: "facultyName",
      render: (text, record) => record.academicFaculty?.name || "N/A",
      filters: facultyNameFilters,
    },
    {
      title: "Academic Department Name",
      key: "departmentName",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "x",
      render: () => (
        <div>
          <Button>Update</Button>
          <Button>Delete</Button>
        </div>
      ),
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.facultyName?.forEach((item) =>
        queryParams.push({ name: "name", value: item as string })
      );

      setParams(queryParams);
    }
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={academicDepartmentData}
      onChange={onChange}
    />
  );
};

export default AcademicDepartment;
