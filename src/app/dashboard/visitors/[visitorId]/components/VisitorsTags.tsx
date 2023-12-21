import { ITag } from "@/src/services/tags/tags.interfaces";
import { useGetTagByVisitorIdQuery } from "@/src/services/tags/tagsApi";
import { AlertTwoTone } from "@ant-design/icons";
import { Card, Divider } from "antd";
import Meta from "antd/es/card/Meta";

const VisitorsTags = ({ visitorId }: { visitorId: string }) => {
  const { data, error } = useGetTagByVisitorIdQuery({ id: visitorId });

  if (error) {
    return "ERROR";
  }

  return (
    <Card
      size="small"
      title="Tags del visitante"
      style={{ width: 300 }}
      bodyStyle={{ paddingRight: 0, height: 200, overflowY: "scroll" }}
    >
      {data?.map((item: ITag) => (
        <>
          <Meta
            avatar={
              <AlertTwoTone twoToneColor={item.isActive ? "#52c41a" : "#999"} />
            }
            key={item.id}
            title="RFID"
            description={item.idRfid}
          />
          <Divider />
        </>
      ))}
    </Card>
  );
};

export default VisitorsTags;
