import { useModalForm } from "@refinedev/antd";
import { useInvalidate, useNavigation } from "@refinedev/core";

import { Form, Input, Modal } from "antd";

import { SALES_UPDATE_DEAL_STAGE_MUTATION } from "./queries";

export const SalesEditStage = () => {
  const invalidate = useInvalidate();
  const { list } = useNavigation();

  const { formProps, modalProps, close } = useModalForm({
    action: "edit",
    defaultVisible: true,
    resource: "dealStages",
    meta: {
      gqlMutation: SALES_UPDATE_DEAL_STAGE_MUTATION,
    },
    onMutationSuccess: () => {
      invalidate({ invalidates: ["list"], resource: "deals" });
    },
    successNotification: () => {
      return {
        key: "edit-stage",
        type: "success",
        message: "Etapa actualizada con éxito",
        description: "Etapa actualizada con éxito",
      };
    },
  });

  return (
    <Modal
      {...modalProps}
      onCancel={() => {
        list("deals", "replace");
        close();
      }}
      title="Editar etapa"
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
