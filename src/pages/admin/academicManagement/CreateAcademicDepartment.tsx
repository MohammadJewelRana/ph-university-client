import { Button, Col, Flex } from "antd";

import PhForm from "../../../components/form/PhForm";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { TResponse } from "../../../types/global";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHSelect from "../../../components/form/PHSelect";

const CreateAcademicDepartment = () => {
  const [addAcademicDeparment] = useAddAcademicDepartmentMutation();
  const { data, isLoading } = useGetAcademicFacultiesQuery(undefined);

  const academicFaculty = data?.data;
  console.log(academicFaculty);

  const academicFacultyOptions = academicFaculty?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    console.log(data);

    try {
      const res = (await addAcademicDeparment(data)) as TResponse;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic department created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={6}>
          <PhForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicDepartmentSchema)}
          >
            <PHInput label="Name" name="name" type={""} />

            <PHSelect
              label="Academic Faculty"
              name="academicFaculty"
              options={academicFacultyOptions}
            />

            <Button htmlType="submit">Submit</Button>
          </PhForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicDepartment;
