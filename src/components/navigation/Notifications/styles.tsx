import styled from "@emotion/styled";

export const NotificationsPanel = styled.div`
  .notification {
    border-bottom: 1px solid #eee;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background: rgba(0, 154, 232, 0.05);
    }

    a {
      color: inherit;
      span {
        font-size: 0.9375rem;
        font-weight: 800;
      }

      p {
        margin: 0.2rem 0 0.5rem 0;
        font-size: 0.9375rem;
      }

      .time {
        font-size: 0.875rem;
      }

      .status {
        padding: 0 10px 0 20px;
      }
    }
  }
`;

export const Dot = styled.div`
  display: inline-block;
  border-radius: 50%;
  background-color: #08c;
  padding: 5px;
`;
