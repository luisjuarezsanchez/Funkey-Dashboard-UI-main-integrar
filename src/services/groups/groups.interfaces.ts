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

export interface IGroupResponse {
  CodigoReserva: string;
  Tipo: string;
  FechaLlegada: string;
  HoraLlegada: string;
  Transporte: {
    Aeropuerto: {
      Nombre: string;
      Aerolinea: string;
      Vuelo: string;
      Horario: string;
    };
    HotelResidencia: {
      Calle: string;
      Numero: string;
      Colina: string;
      Ciudad: string;
      Horario: string;
    };
    DorToDor: string;
  };
  Ocasion: string;
  OptOutPhotoOpp: boolean;
  Idioma: string;
  FechaSalida: string;
  HoraSalida: string;
  Grupo: {
    CodigoGrupo: string;
    NumVisitantes: number;
    Estatus: string;
    Integridad: string;
    PerfilVisitantes: IVisitorResponse[];
  };
}

export interface IGroup {
  key: string;
  bookingId: string;
  namegroup: string;
  date: string;
  hour: string;
  responsable: string;
  language: string;
  visitorsCount: number;
  visitors: IVisitor[];
}

export interface IVisitor {
  key: React.Key;
  name: string;
  age: string;
  language: string;
  nacionality: string;
  client: string;
  gender: string;
  mail: string;
}
