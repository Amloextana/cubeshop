export const DOMEN = "http://127.0.0.1:8000/"

export const CATEGORIES = [
  {
    id: 0,
    name: "Любая категория",
  },
  {
    id: 1,
    name: "Солнечная панель",
  },
  {
    id: 2,
    name: "Корпус",
  },
  {
    id: 3,
    name: "Вычислительный модуль",
  }, 
]


// import engine from "./assets/engine.png"
export const ComponentsMock = [
  {
    id: 1,
    title: "Корпус 1U",
    category: "Корпус",
    description:
      "Корпус быстро и просто собирается при использовании только 8 винтов, обеспечивает надежную основу для спутника и легкий доступ к устройствам, установленным внутри корпуса.",
    available: true,
    price: 1500,
    image: "src/assets/mockImg/korpus1u.jpg",
  },
  {
    id: 3,
    title: "Солнечная панель 1U",
    category: "Солнечная панель",
    description:
      "Панель предназначена для установки на торцевые поверхности корпуса формата 1U и 3U CubeSat. Панель имеет встроенную электромагнитную катушку, которая может быть задействована в системе ориентации и стабилизации аппарата.",
    available: true,
    price: 3800,
    image: "src/assets/mockImg/panel.jpg",
  },
  
  {
    id: 2,
    title: "Корпус 3U",
    category: "Корпус",
    description:
      "Корпус быстро и просто собирается, обеспечивает надежную основу для спутника и легкий доступ к устройствам, установленным внутри корпуса и подсоединенным снаружи.", 
    available: true,
    price: 4000,
    image: "src/assets/mockImg/korpus3u.jpg",
  },
  {
    id: 5,
    title: "БВМ SXC-MB-04",
    category: "Вычислительный модуль",
    description:
      "Экономичный микроконтроллер обеспечивает CAN-интерфейс для датчиков и управляет бортовыми системами, одновременно контролируя выполнение плана полета для снижения энергопотребления основного вычислительного модуля. Этот микроконтроллер может автономно запускать алгоритм стабилизации, используя встроенный драйвер электромагнитных катушек.",
    available: true,
    price: 5500,
    image: "src/assets/mockImg/bvm.jpg",
  },
  {
    id: 4,
    title: "GaAs панель 1U",
    category: "Солнечная панель",
    description:
      "Панель предназначена для установки на боковую кромку корпуса формата 1U CubeSat. Несколько панелей могут быть объединены для установки на боковые кромки корпуса формата 3U. Панель имеет встроенную электромагнитную катушку, которая может быть задействована в системе ориентации и стабилизации аппарата.",
    available: true,
    price: 3800,
    image: "src/assets/mockImg/panel.jpg",
  },

  {
    id: 6,
    title: "БВМ ABB-MB-01",
    category: "Вычислительный модуль",
    description:
      "Экономичный микроконтроллер обеспечивает CAN-интерфейс для датчиков и управляет бортовыми системами, одновременно контролируя выполнение плана полета для снижения энергопотребления основного вычислительного модуля. Этот микроконтроллер может автономно запускать алгоритм стабилизации, используя встроенный драйвер электромагнитных катушек.",
    available: true,
    price: 6700,
    image: "src/assets/mockImg/bvm.jpg",
  },
]
