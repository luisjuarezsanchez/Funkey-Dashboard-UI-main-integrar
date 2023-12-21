import styled from "@emotion/styled";

export const ModalContaner = styled.div`
  position: relative;

  .preview-wrap {
    display: flex;
    position: relative;
    width: 100%;
  }

  .preview-skeleton {
    width: 100%;
    aspect-ratio: 16 / 9;

    .ant-skeleton-image {
      width: 100%;
      height: 100%;
    }
  }

  .preview-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (min-width: 1024px) {
    .preview-skeleton {
      width: 900px;
    }

    .preview-skeleton {
      width: 900px;
    }

    .preview-wrap {
      width: 900px;
    }
  }
`;
