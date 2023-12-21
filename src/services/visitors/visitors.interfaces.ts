export interface IVisitorResponse {
  IdSalesForce: string;
  GeneroPrefijos: string;
  Nombre: string;
  Apellido: string;
  Email: string;
  Nacionalidad: string;
  Idiomas: string;
  CategoriaCA: string;
  Notas: [
    {
      Tipo: string;
      Mensaje: string;
    },
  ];
  Restricciones: {
    Alimentacion: string;
    Alergias: string;
  };
  Preferencias: {
    ProductosFavoritos: string;
    Compras: string;
    VisitasHechas: string;
    Colecciones: string;
    EdicionesLimitadads: string;
  };
}

export interface IVisitors {
  name: string;
  age: string;
  reservationType: string;
  language: string;
  client: string;
  mail: string;
  nationality: string;
  responsable: string;
  group: string;
}
