import styled from "@emotion/styled";

type GroupLabelProps = {
  colorIndex: number;
};

const colors: string[] = [
  "#722ED1",
  "#13C2C2",
  "#FFA940",
  "#40A9FF",
  "#D3ADF7",
  "#52C41A",
  "#FFA39E",
  "#B7EB8F",
];

export const GroupLabel = styled.span<GroupLabelProps>`
  color: ${(props) => colors[props.colorIndex % colors.length] || "#FF7A45"};
  font-weight: bolder;
  font-size: 1rem;
`;
