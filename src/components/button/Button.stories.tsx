import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
        "link",
        "outline-primary",
        "outline-secondary",
        "outline-success",
        "outline-danger",
        "outline-warning",
        "outline-info",
        "outline-light",
        "outline-dark",
      ],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    block: { control: "boolean" },
    active: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    loadingLabel: { control: "text" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", children: "Primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Success: Story = {
  args: { variant: "success", children: "Success" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Danger" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Warning" },
};

export const Info: Story = {
  args: { variant: "info", children: "Info" },
};

export const Light: Story = {
  args: { variant: "light", children: "Light" },
};

export const Dark: Story = {
  args: { variant: "dark", children: "Dark" },
};

export const Link: Story = {
  args: { variant: "link", children: "Link" },
};

export const Small: Story = {
  args: { variant: "primary", size: "sm", children: "Small" },
};

export const Large: Story = {
  args: { variant: "primary", size: "lg", children: "Large" },
};

export const Disabled: Story = {
  args: { variant: "primary", disabled: true, children: "Disabled" },
};

export const Active: Story = {
  args: { variant: "primary", active: true, children: "Active" },
};

export const Loading: Story = {
  args: { variant: "primary", loading: true, loadingLabel: "Loading…", children: "Submit" },
};

export const LoadingNoLabel: Story = {
  args: { variant: "secondary", loading: true, children: "Saving" },
};

export const Block: Story = {
  args: { variant: "primary", block: true, children: "Block button" },
  parameters: { layout: "padded" },
};

export const OutlinePrimary: Story = {
  args: { variant: "outline-primary", children: "Outline Primary" },
};

export const OutlineDanger: Story = {
  args: { variant: "outline-danger", children: "Outline Danger" },
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", maxWidth: 600 }}>
      {(
        [
          "primary",
          "secondary",
          "success",
          "danger",
          "warning",
          "info",
          "light",
          "dark",
          "link",
        ] as const
      ).map((v) => (
        <Button key={v} variant={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
    </div>
  ),
};

export const AllOutlineVariants: Story = {
  name: "All Outline Variants",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", maxWidth: 600 }}>
      {(
        [
          "outline-primary",
          "outline-secondary",
          "outline-success",
          "outline-danger",
          "outline-warning",
          "outline-info",
          "outline-dark",
        ] as const
      ).map((v) => (
        <Button key={v} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Default</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
};
