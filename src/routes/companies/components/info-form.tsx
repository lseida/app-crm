import { useState } from "react";

import { useShow } from "@refinedev/core";
import type { GetFields } from "@refinedev/nestjs-query";

import {
  ApiOutlined,
  BankOutlined,
  ColumnWidthOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Card, Input, InputNumber, Select, Space } from "antd";

import { SingleElementForm, Text } from "@/components";
import type {
  BusinessType,
  CompanySize,
  Industry,
} from "@/graphql/schema.types";
import type { CompanyInfoQuery } from "@/graphql/types";
import { currencyNumber } from "@/utilities";

import { COMPANY_INFO_QUERY } from "./queries";

type Company = GetFields<CompanyInfoQuery>;

export const CompanyInfoForm = () => {
  const [activeForm, setActiveForm] = useState<
    | "totalRevenue"
    | "industry"
    | "companySize"
    | "businessType"
    | "country"
    | "website"
  >();

  const { query: queryResult } = useShow<Company>({
    meta: {
      gqlQuery: COMPANY_INFO_QUERY,
    },
  });

  const data = queryResult?.data?.data;
  const {
    totalRevenue,
    industry,
    companySize,
    businessType,
    country,
    website,
  } = data || {};

  const getActiveForm = (args: { formName: keyof Company }) => {
    const { formName } = args;

    if (activeForm === formName) {
      return "form";
    }

    if (!data?.[formName]) {
      return "empty";
    }

    return "view";
  };

  const loading = queryResult?.isLoading;

  return (
    <Card
      title={
        <Space size={15}>
          {/* @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66 */}
          <ShopOutlined className="sm" />
          <Text>Company info</Text>
        </Space>
      }
      headStyle={{
        padding: "1rem",
      }}
      bodyStyle={{
        padding: "0",
      }}
      style={{
        maxWidth: "500px",
      }}
    >
      <SingleElementForm
        loading={loading}
        style={{
          padding: "0.5rem 1rem",
        }}
        // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
        icon={<ColumnWidthOutlined className="tertiary" />}
        state={getActiveForm({ formName: "companySize" })}
        itemProps={{
          name: "companySize",
          label: "Tamaño de la empresa",
        }}
        view={<Text>{companySize}</Text>}
        onClick={() => setActiveForm("companySize")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      >
        <Select
          autoFocus
          defaultValue={companySize}
          options={companySizeOptions}
          style={{
            width: "100%",
          }}
        />
      </SingleElementForm>
      <SingleElementForm
        loading={loading}
        style={{
          padding: "0.5rem 1rem",
        }}
        // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
        icon={<DollarOutlined className="tertiary" />}
        state={getActiveForm({ formName: "totalRevenue" })}
        itemProps={{
          name: "totalRevenue",
          label: "Ingreso total",
        }}
        view={<Text>{currencyNumber(totalRevenue || 0)}</Text>}
        onClick={() => setActiveForm("totalRevenue")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      >
        <InputNumber
          autoFocus
          addonBefore={"$"}
          min={0}
          placeholder="0,00"
          defaultValue={totalRevenue || 0}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
      </SingleElementForm>
      <SingleElementForm
        loading={loading}
        style={{
          padding: "0.5rem 1rem",
        }}
        // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
        icon={<BankOutlined className="tertiary" />}
        state={getActiveForm({ formName: "industry" })}
        itemProps={{
          name: "industry",
          label: "Industria",
        }}
        view={<Text>{industry}</Text>}
        onClick={() => setActiveForm("industry")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      >
        <Select
          autoFocus
          defaultValue={industry}
          options={industryOptions}
          style={{
            width: "100%",
          }}
        />
      </SingleElementForm>
      <SingleElementForm
        loading={loading}
        style={{
          padding: "0.5rem 1rem",
        }}
        // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
        icon={<ApiOutlined className="tertiary" />}
        state={getActiveForm({ formName: "businessType" })}
        itemProps={{
          name: "businessType",
          label: "Tipo de negocio",
        }}
        view={<Text>{businessType}</Text>}
        onClick={() => setActiveForm("businessType")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      >
        <Select
          autoFocus
          defaultValue={businessType}
          options={businessTypeOptions}
          style={{
            width: "100%",
          }}
        />
      </SingleElementForm>
      <SingleElementForm
        loading={loading}
        style={{
          padding: "0.5rem 1rem",
        }}
        // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
        icon={<EnvironmentOutlined className="tertiary" />}
        state={getActiveForm({ formName: "country" })}
        itemProps={{
          name: "country",
          label: "País",
        }}
        view={<Text>{country}</Text>}
        onClick={() => setActiveForm("country")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      >
        <Input
          autoFocus
          defaultValue={country || ""}
          placeholder="País"
          style={{
            width: "100%",
          }}
        />
      </SingleElementForm>
      <SingleElementForm
        loading={loading}
        style={{
          padding: "0.5rem 1rem",
        }}
        // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
        icon={<EnvironmentOutlined className="tertiary" />}
        state={getActiveForm({ formName: "website" })}
        itemProps={{
          name: "website",
          label: "Sitio web",
        }}
        view={<Text>{website}</Text>}
        onClick={() => setActiveForm("website")}
        onUpdate={() => setActiveForm(undefined)}
        onCancel={() => setActiveForm(undefined)}
      >
        <Input
          autoFocus
          defaultValue={website || ""}
          placeholder="Sitio web"
          style={{
            width: "100%",
          }}
        />
      </SingleElementForm>
    </Card>
  );
};

const companySizeOptions: {
  label: string;
  value: CompanySize;
}[] = [
  {
    label: "Empresa",
    value: "ENTERPRISE",
  },
  {
    label: "Grande",
    value: "LARGE",
  },
  {
    label: "Mediana",
    value: "MEDIUM",
  },
  {
    label: "Pequeña",
    value: "SMALL",
  },
];

const industryOptions: {
  label: string;
  value: Industry;
}[] = [
  { label: "Aeroespacial", value: "AEROSPACE" },
  { label: "Agricultura", value: "AGRICULTURE" },
  { label: "Automotriz", value: "AUTOMOTIVE" },
  { label: "Químicos", value: "CHEMICALS" },
  { label: "Construcción", value: "CONSTRUCTION" },
  { label: "Defensa", value: "DEFENSE" },
  { label: "Educación", value: "EDUCATION" },
  { label: "Energía", value: "ENERGY" },
  { label: "Servicios financieros", value: "FINANCIAL_SERVICES" },
  { label: "Alimentos y bebidas", value: "FOOD_AND_BEVERAGE" },
  { label: "Gobierno", value: "GOVERNMENT" },
  { label: "Salud", value: "HEALTHCARE" },
  { label: "Hospitalidad", value: "HOSPITALITY" },
  { label: "Manufactura industrial", value: "INDUSTRIAL_MANUFACTURING" },
  { label: "Seguros", value: "INSURANCE" },
  { label: "Ciencias de la vida", value: "LIFE_SCIENCES" },
  { label: "Logistica", value: "LOGISTICS" },
  { label: "Media", value: "MEDIA" },
  { label: "Minería", value: "MINING" },
  { label: "ONG", value: "NONPROFIT" },
  { label: "Otro", value: "OTHER" },
  { label: "Farmaceutico", value: "PHARMACEUTICALS" },
  { label: "Servicios profesionales", value: "PROFESSIONAL_SERVICES" },
  { label: "Inmobiliaria", value: "REAL_ESTATE" },
  { label: "Retail", value: "RETAIL" },
  { label: "Tecnología", value: "TECHNOLOGY" },
  { label: "Telecommunications", value: "TELECOMMUNICATIONS" },
  { label: "Transporte", value: "TRANSPORTATION" },
  { label: "Servicios públicos", value: "UTILITIES" },
];

const businessTypeOptions: {
  label: string;
  value: BusinessType;
}[] = [
  {
    label: "B2B",
    value: "B2B",
  },
  {
    label: "B2C",
    value: "B2C",
  },
  {
    label: "B2G",
    value: "B2G",
  },
];
