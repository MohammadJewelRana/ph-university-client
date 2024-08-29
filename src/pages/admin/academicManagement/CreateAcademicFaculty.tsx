import { Button, Col, Flex } from "antd";

import PhForm from "../../../components/form/PhForm";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { TResponse } from "../../../types/global";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    console.log(data);
    const academicFacultyData = { name: data?.name };
    console.log(academicFacultyData);

    try {
      const res = (await addAcademicFaculty(academicFacultyData)) as TResponse;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Academic Faculty created", { id: toastId });
        
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={6}>
          <PhForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicFacultySchema)}
          >
            <PHInput label="Name" name="name" type={""} />

            <Button htmlType="submit">Submit</Button>
          </PhForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicFaculty;
