import { IGenre } from '@core/interfaces';

export const GENRES_MOCK: IGenre[] = [
  {
    id: 1,
    name: 'Бизнес-книги',
    amountBooks: 32539,
    subGenres: [
      {
        id: 100,
        name: 'Банковское дело',
        amountBooks: 163
      },
      {
        id: 101,
        name: 'Бухучет, налогообложение',
        amountBooks: 331
      },
      {
        id: 103,
        name: 'Государственное и муниципальное управление',
        amountBooks: 339
      }
    ]
  },
  {
    id: 2,
    name: 'Боевики, остросюжетная литература',
    amountBooks: 4029,
    subGenres: [
      {
        id: 200,
        name: 'Боевики',
        amountBooks: 2854
      },
      {
        id: 201,
        name: 'Криминальные боевики',
        amountBooks: 1297
      }
    ]
  },
  {
    id: 3,
    name: 'Детективы',
    amountBooks: 24256,
    subGenres: [
      {
        id: 300,
        name: 'Иронические детективы',
        amountBooks: 2270
      },
      {
        id: 301,
        name: 'Классические детективы',
        amountBooks: 1667
      },
      {
        id: 302,
        name: 'Политические детективы',
        amountBooks: 451
      },
    ]
  },
  {
    id: 4,
    name: 'Зарубежная литература',
    amountBooks: 31662,
    subGenres: [
      {
        id: 400,
        name: 'Зарубежная деловая литература',
        amountBooks: 1663
      },
      {
        id: 401,
        name: 'Зарубежная драматургия',
        amountBooks: 728
      },
      {
        id: 402,
        name: 'Зарубежная классика',
        amountBooks: 3807
      },
      {
        id: 403,
        name: 'Зарубежная поэзия',
        amountBooks: 758
      }
    ]
  },
  {
    id: 5,
    name: 'История',
    amountBooks: 27063,
    subGenres: [
      {
        id: 500,
        name: 'Документальная литература',
        amountBooks: 4822
      },
      {
        id: 501,
        name: 'Историческая литература',
        amountBooks: 6366
      },
      {
        id: 502,
        name: 'Историческа фантастика',
        amountBooks: 4526
      },
      {
        id: 503,
        name: 'Исторические детективы',
        amountBooks: 1547
      },
      {
        id: 504,
        name: 'Исторические любовные романы',
        amountBooks: 1791
      }
    ]
  },
  {
    id: 6,
    name: 'Классическая литература',
    amountBooks: 23869,
    subGenres: [
      {
        id: 600,
        name: 'Античная литература',
        amountBooks: 281
      },
      {
        id: 601,
        name: 'Древневосточная литература',
        amountBooks: 156
      },
      {
        id: 602,
        name: 'Европейская старинная фантастика',
        amountBooks: 79
      },
      {
        id: 603,
        name: 'Литература 18 века',
        amountBooks: 284
      },
      {
        id: 604,
        name: 'Литература 19 века',
        amountBooks: 2304
      },
      {
        id: 605,
        name: 'Литература 20 века',
        amountBooks: 6127
      }
    ]
  },
  {
    id: 7,
    name: 'Культура и искусство',
    amountBooks: 14435,
    subGenres: [
      {
        id: 700,
        name: 'Архитектура',
        amountBooks: 356
      },
      {
        id: 701,
        name: 'Дизайн',
        amountBooks: 500
      },
      {
        id: 702,
        name: 'Искусствоведение',
        amountBooks: 2858
      },
      {
        id: 703,
        name: 'История искусств',
        amountBooks: 2456
      },
      {
        id: 704,
        name: 'Кинематограф, театр',
        amountBooks: 3716
      },
      {
        id: 705,
        name: 'Музеи и коллекции',
        amountBooks: 120
      },
      {
        id: 706,
        name: 'Музыка',
        amountBooks: 1097
      }
    ]
  },
  {
    id: 8,
    name: 'Любовный романы',
    amountBooks: 22963,
    subGenres: [
      {
        id: 800,
        name: 'Короткие любоные романы',
        amountBooks: 6202
      },
      {
        id: 801,
        name: 'Остросюжетные любовные романы',
        amountBooks: 5620
      },
      {
        id: 802,
        name: 'Современные любовные романы',
        amountBooks: 15888
      }
    ]
  },
  {
    id: 9,
    name: 'Наука и образование',
    amountBooks: 13518,
    subGenres: [
      {
        id: 900,
        name: 'Военное дело',
        amountBooks: 535
      },
      {
        id: 901,
        name: 'Задачники',
        amountBooks: 32
      },
      {
        id: 902,
        name: 'Монографии',
        amountBooks: 1316
      },
      {
        id: 903,
        name: 'Научно-популярная механика',
        amountBooks: 6707
      },
      {
        id: 904,
        name: 'Практикумы',
        amountBooks: 118
      },
      {
        id: 905,
        name: 'Прочая образовательная литература',
        amountBooks: 3753
      },
      {
        id: 906,
        name: 'Учебники и пособия для вузов',
        amountBooks: 1030
      }
    ]
  }
];
