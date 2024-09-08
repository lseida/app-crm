import { useModalForm } from "@refinedev/antd";
import { useInvalidate, useNavigation } from "@refinedev/core";

import { Form, Input, Modal } from "antd";

import { SALES_CREATE_DEAL_STAGE_MUTATION } from "./queries";

export const SalesCreateStage = () => {
  const invalidate = useInvalidate();
  const { list } = useNavigation();
  const { formProps, modalProps, close } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "dealStages",
    meta: {
      gqlMutation: SALES_CREATE_DEAL_STAGE_MUTATION,
    },
    onMutationSuccess: () => {
      invalidate({ invalidates: ["list"], resource: "deals" });
    },
    successNotification: () => {
      return {
        key: "create-stage",
        type: "success",
        message: "Etapa creada con éxito",
        description: "Etapa creada con éxito",
      };
    },
  });

  return (
    <Modal
      {...modalProps}
      onCancel={() => {
        close();
        list("deals", "replace");
      }}
      title="Agregar nueva etapa"
      width={512}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
