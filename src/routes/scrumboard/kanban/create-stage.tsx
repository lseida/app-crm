import { useModalForm } from "@refinedev/antd";
import { useInvalidate, useNavigation } from "@refinedev/core";
import type { GetFields } from "@refinedev/nestjs-query";

import { Form, Input, Modal } from "antd";

import type { KanbanCreateStageMutation } from "@/graphql/types";

import { KANBAN_CREATE_STAGE_MUTATION } from "./queries";

export const KanbanCreateStage = () => {
  const invalidate = useInvalidate();
  const { list } = useNavigation();
  const { formProps, modalProps, close } = useModalForm<
    GetFields<KanbanCreateStageMutation>
  >({
    action: "create",
    defaultVisible: true,
    resource: "taskStages",
    meta: {
      gqlMutation: KANBAN_CREATE_STAGE_MUTATION,
    },
    onMutationSuccess: () => {
      invalidate({ invalidates: ["list"], resource: "tasks" });
    },
    successNotification: () => {
      return {
        key: "create-stage",
        type: "success",
        message: "Estado creado",
        description: "Estado creado",
      };
    },
  });

  return (
    <Modal
      {...modalProps}
      onCancel={() => {
        close();
        list("tasks", "replace");
      }}
      title="Agregar nuevo estado"
      width={512}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item label="Título" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
