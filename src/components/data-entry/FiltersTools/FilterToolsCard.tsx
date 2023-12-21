

// import { AutoComplete, Button, Card, DatePicker, DatePickerProps, Input, Space } from "antd";
// import { RangePickerProps } from "antd/es/date-picker";

// const AutoStyle: React.CSSProperties = {
//     width: "31.42rem",
//     backgroundColor: "#969CB4",
//   };
//   const { RangePicker } = DatePicker;
  
// const onChange = (
//     value: DatePickerProps['value'] | RangePickerProps['value'],
//     dateString: [string, string] | string,
//   ) => {
//     console.log('Selected Time: ', value);
//     console.log('Formatted Selected Time: ', dateString);
//   };
  
//   const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
//     console.log('onOk: ', value);
//   };

// const FilterToolsCard= () =>{
    
//   return (
//     <Card title="Encontrar visitante" className="card-style">
//     <Space size={12}>
//       <RangePicker
//         showTime={{ format: 'HH:mm' }}
//         format="YYYY-MM-DD HH:mm"
//         onChange={onChange}
//         onOk={onOk}
//       />
//       <AutoComplete
//         popupClassName="certain-category-search-dropdown"
//         popupMatchSelectWidth={500}
//         size="large"
//       >
//         <Input.Search
//           style={AutoStyle}
//           size="large"
//           placeholder="Nombre/E-mail/Edad"
//           onChange={handlerOnInputChange}
//         />
//       </AutoComplete>
//       <Button
//         type="primary"
//         className="button-style"
//         onClick={() => searchVistors()}
//       >
//         Buscar
//       </Button>
//     </Space>
//   </Card>
//   );
// };

// export default FilterToolsCard;
