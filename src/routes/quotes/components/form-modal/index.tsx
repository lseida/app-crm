import type { FC } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

import { useModalForm } from "@refinedev/antd";
import {
  type HttpError,
  type RedirectAction,
  useNavigation,
} from "@refinedev/core";
import type { GetFields, GetVariables } from "@refinedev/nestjs-query";

import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Spin } from "antd";

import type {
  QuotesCreateQuoteMutation,
  QuotesCreateQuoteMutationVariables,
} from "@/graphql/types";
import { useCompaniesSelect } from "@/hooks/useCompaniesSelect";
import { useContactsSelect } from "@/hooks/useContactsSelect";
import { useUsersSelect } from "@/hooks/useUsersSelect";

import {
  QUOTES_CREATE_QUOTE_MUTATION,
  QUOTES_UPDATE_QUOTE_MUTATION,
} from "../../queries";

type Props = {
  action: "create" | "edit";
  redirect?: RedirectAction;
  onMutationSuccess?: () => void;
  onCancel?: () => void;
};

export const QuotesFormModal: FC<Props> = ({
  action,
  redirect,
  onCancel,
  onMutationSuccess,
}) => {
  const { pathname } = useLocation();
  const params = useParams<{ id: string }>();
  const { list, replace } = useNavigation();
  const [searchParams] = useSearchParams();

  const { formProps, modalProps, close } = useModalForm<
    GetFields<QuotesCreateQuoteMutation>,
    HttpError,
    GetVariables<QuotesCreateQuoteMutationVariables>
  >({
    resource: "quotes",
    action,
    id: params.id,
    defaultVisible: true,
    redirect,
    meta: {
      gqlMutation:
        action === "create"
          ? QUOTES_CREATE_QUOTE_MUTATION
          : QUOTES_UPDATE_QUOTE_MUTATION,
    },
    onMutationSuccess: () => {
      onMutationSuccess?.();
    },
  });

  const {
    selectProps: selectPropsCompanies,
    queryResult: { isLoading: isLoadingCompanies },
  } = useCompaniesSelect();

  const {
    selectProps: selectPropsContacts,
    queryResult: { isLoading: isLoadingContact },
  } = useContactsSelect();

  const {
    selectProps: selectPropsSalesOwners,
    queryResult: { isLoading: isLoadingSalesOwners },
  } = useUsersSelect();

  const loading =
    isLoadingCompanies || isLoadingContact || isLoadingSalesOwners;

  const isHaveOverModal = pathname.includes("company-create");

  return (
    <Modal
      {...modalProps}
      confirmLoading={loading}
      width={560}
      style={{ display: isHaveOverModal ? "none" : "inherit" }}
      onCancel={() => {
        if (onCancel) {
          onCancel();
          return;
        }
        //TODO: modalProps.onCancel expect an event so, I used close. Actually both of them are same.
        close();
        list("quotes", "replace");
      }}
    >
      <Spin spinning={loading}>
        <Form {...formProps} layout="vertical">
          <Form.Item
            rules={[{ required: true }]}
            name="title"
            label="Título de la Cotización "
          >
            <Input placeholder="Por favor, ingrese el título de la Cotización" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name={["salesOwnerId"]}
            initialValue={formProps?.initialValues?.salesOwner?.id}
            label="Vendedor"
          >
            <Select
              {...selectPropsSalesOwners}
              placeholder="Por favor, seleccione el usuario"
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name={["companyId"]}
            initialValue={
              searchParams.get("companyId") ??
              formProps?.initialValues?.company?.id
            }
            label="Empresa"
            extra={
              <Button
                style={{ paddingLeft: 0 }}
                type="link"
                // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                icon={<PlusCircleOutlined />}
                onClick={() => replace(`company-create?to=${pathname}`)}
              >
                Agregar nueva Empresa
              </Button>
            }
          >
            <Select
              {...selectPropsCompanies}
              placeholder="Por favor, seleccione la Empresa"
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name={["contactId"]}
            initialValue={formProps?.initialValues?.contact?.id}
            label="Contacto de la Cotización"
          >
            <Select
              {...selectPropsContacts}
              placeholder="Por favor, seleccione el contacto"
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
