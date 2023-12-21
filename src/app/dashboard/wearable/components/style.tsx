import styled from "@emotion/styled";

export const Section = styled.section`
  background: #fff;
  padding: 0px 20px 20px 20px;

  h1 {
    font-size: 2rem;
  }

  .card-style {
    width: 73rem;
    height: 9rem;
    border-radius: 0.625rem;
    background-color: #969cb4;
  }

  .button-style {
    border-radius: 2rem;
    width: 10rem;
    height: 2.5rem;
    background-color: #24314c;
  }
`;

export const ResultContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
