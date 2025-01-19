import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "components/ui/breadcrumb";

const Breadcrumb = () => {
  return (
    <BreadcrumbRoot>
      <BreadcrumbCurrentLink color="orange">Props</BreadcrumbCurrentLink>
      <BreadcrumbLink cursor="pointer" color="neutral" href="#">Docs</BreadcrumbLink>
      <BreadcrumbLink cursor="pointer" color="neutral" href="#">Components</BreadcrumbLink>
    </BreadcrumbRoot>
  );
};

export default Breadcrumb;
