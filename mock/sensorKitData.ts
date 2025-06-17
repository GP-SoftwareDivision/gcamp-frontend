export type SensorKitType = {
  name: string
  code: string
  mac: string
  status: '정상' | '이상' | '수리' | '불량'
  type: '하우스' | '노지'
  useStatus: '사용중' | '미사용'
}

export const sensorKitData: SensorKitType[] = [
  {
    name: '센서킷1',
    code: 'sensorkit-001',
    mac: 'E831CDAF7F4C',
    status: '정상',
    type: '하우스',
    useStatus: '사용중',
  },
  {
    name: '센서킷2',
    code: 'sensorkit-002',
    mac: 'E831CDAF7DC4',
    status: '정상',
    type: '하우스',
    useStatus: '사용중',
  },
  {
    name: '센서킷3',
    code: 'sensorkit-003',
    mac: 'E845ACCF5CD1',
    status: '정상',
    type: '노지',
    useStatus: '미사용',
  },
  {
    name: '센서킷4',
    code: 'sensorkit-004',
    mac: 'E80011223344',
    status: '정상',
    type: '노지',
    useStatus: '사용중',
  },
  {
    name: '센서킷5',
    code: 'sensorkit-005',
    mac: 'E80099887766',
    status: '정상',
    type: '하우스',
    useStatus: '사용중',
  },
  {
    name: '센서킷6',
    code: 'sensorkit-006',
    mac: 'E80044556677',
    status: '정상',
    type: '노지',
    useStatus: '미사용',
  },
  {
    name: '센서킷7',
    code: 'sensorkit-007',
    mac: 'E80055667788',
    status: '정상',
    type: '하우스',
    useStatus: '사용중',
  },
  {
    name: '센서킷8',
    code: 'sensorkit-008',
    mac: 'E80066778899',
    status: '정상',
    type: '하우스',
    useStatus: '사용중',
  },
  {
    name: '센서킷9',
    code: 'sensorkit-009',
    mac: 'E80077889900',
    status: '정상',
    type: '노지',
    useStatus: '미사용',
  },
  {
    name: '센서킷10',
    code: 'sensorkit-010',
    mac: 'E80088990011',
    status: '정상',
    type: '하우스',
    useStatus: '사용중',
  },
  {
    name: '센서킷11',
    code: 'sensorkit-011',
    mac: 'E80099001122',
    status: '정상',
    type: '노지',
    useStatus: '미사용',
  },
  {
    name: '센서킷12',
    code: 'sensorkit-012',
    mac: 'E80010111213',
    status: '정상',
    type: '하우스',
    useStatus: '사용중',
  },
  {
    name: '센서킷13',
    code: 'sensorkit-013',
    mac: 'E80011121314',
    status: '정상',
    type: '하우스',
    useStatus: '사용중',
  },
  {
    name: '센서킷14',
    code: 'sensorkit-014',
    mac: 'E80012131415',
    status: '정상',
    type: '노지',
    useStatus: '사용중',
  },
  {
    name: '센서킷15',
    code: 'sensorkit-015',
    mac: 'E80013141516',
    status: '정상',
    type: '노지',
    useStatus: '미사용',
  },
  {
    name: '센서킷16',
    code: 'sensorkit-016',
    mac: 'E80014151617',
    status: '정상',
    type: '하우스',
    useStatus: '사용중',
  },
  {
    name: '센서킷17',
    code: 'sensorkit-017',
    mac: 'E80015161718',
    status: '정상',
    type: '하우스',
    useStatus: '사용중',
  },
  {
    name: '센서킷18',
    code: 'sensorkit-018',
    mac: 'E80016171819',
    status: '정상',
    type: '노지',
    useStatus: '미사용',
  },
  {
    name: '센서킷19',
    code: 'sensorkit-019',
    mac: 'E80017181920',
    status: '정상',
    type: '하우스',
    useStatus: '사용중',
  },
  {
    name: '센서킷20',
    code: 'sensorkit-020',
    mac: 'E80018202122',
    status: '정상',
    type: '노지',
    useStatus: '미사용',
  },
]

export type SensorKit = {
  name: string
  code: string
  mac: string
  status: string
  type: string
  useStatus: string
  sensorRes: {
    code: string
    name: string
    type: string
  }[]
}

export const sensorKitDetailsData: SensorKit[] = [
  {
    name: '센서킷1',
    code: 'sensorkit-001',
    mac: 'E8544B550775',
    status: '정상',
    type: '하우스',
    useStatus: '미사용',
    sensorRes: [
      {
        code: 'sensor-001',
        name: '근권센서1',
        type: '습도',
      },
      {
        code: 'sensor-002',
        name: '근권센서2',
        type: '습도',
      },
    ],
  },
  {
    name: '센서킷2',
    code: 'sensorkit-002',
    mac: 'E883E930F3B5',
    status: '정상',
    type: '노지',
    useStatus: '사용중',
    sensorRes: [
      {
        code: 'sensor-003',
        name: '근권센서3',
        type: 'PH',
      },
      {
        code: 'sensor-004',
        name: '근권센서4',
        type: '온도',
      },
    ],
  },
  {
    name: '센서킷3',
    code: 'sensorkit-003',
    mac: 'E8412A360F80',
    status: '정상',
    type: '하우스',
    useStatus: '미사용',
    sensorRes: [
      {
        code: 'sensor-005',
        name: '근권센서5',
        type: '습도',
      },
      {
        code: 'sensor-006',
        name: '근권센서6',
        type: 'PH',
      },
    ],
  },
  {
    name: '센서킷4',
    code: 'sensorkit-004',
    mac: 'E81CA4EFF073',
    status: '정상',
    type: '노지',
    useStatus: '사용중',
    sensorRes: [
      {
        code: 'sensor-007',
        name: '근권센서7',
        type: 'EC',
      },
      {
        code: 'sensor-008',
        name: '근권센서8',
        type: '온도',
      },
    ],
  },
  {
    name: '센서킷5',
    code: 'sensorkit-005',
    mac: 'E8EC10321E16',
    status: '정상',
    type: '노지',
    useStatus: '미사용',
    sensorRes: [
      {
        code: 'sensor-009',
        name: '근권센서9',
        type: '온도',
      },
      {
        code: 'sensor-010',
        name: '근권센서10',
        type: '습도',
      },
    ],
  },
  {
    name: '센서킷6',
    code: 'sensorkit-006',
    mac: 'E8487FAEF406',
    status: '정상',
    type: '하우스',
    useStatus: '미사용',
    sensorRes: [
      {
        code: 'sensor-011',
        name: '근권센서11',
        type: '습도',
      },
      {
        code: 'sensor-012',
        name: '근권센서12',
        type: '온도',
      },
    ],
  },
  {
    name: '센서킷7',
    code: 'sensorkit-007',
    mac: 'E82FB36DC062',
    status: '정상',
    type: '하우스',
    useStatus: '미사용',
    sensorRes: [
      {
        code: 'sensor-013',
        name: '근권센서13',
        type: '습도',
      },
      {
        code: 'sensor-014',
        name: '근권센서14',
        type: 'EC',
      },
    ],
  },
  {
    name: '센서킷8',
    code: 'sensorkit-008',
    mac: 'E870FD0D7F31',
    status: '정상',
    type: '하우스',
    useStatus: '사용중',
    sensorRes: [
      {
        code: 'sensor-015',
        name: '근권센서15',
        type: '온도',
      },
      {
        code: 'sensor-016',
        name: '근권센서16',
        type: '온도',
      },
    ],
  },
  {
    name: '센서킷9',
    code: 'sensorkit-009',
    mac: 'E8266930774E',
    status: '정상',
    type: '노지',
    useStatus: '미사용',
    sensorRes: [
      {
        code: 'sensor-017',
        name: '근권센서17',
        type: '온도',
      },
      {
        code: 'sensor-018',
        name: '근권센서18',
        type: '습도',
      },
    ],
  },
  {
    name: '센서킷10',
    code: 'sensorkit-010',
    mac: 'E8E3C2BE1203',
    status: '정상',
    type: '노지',
    useStatus: '미사용',
    sensorRes: [
      {
        code: 'sensor-019',
        name: '근권센서19',
        type: 'PH',
      },
      {
        code: 'sensor-020',
        name: '근권센서20',
        type: '습도',
      },
    ],
  },
  {
    name: '센서킷11',
    code: 'sensorkit-011',
    mac: 'E8E68F14280A',
    status: '정상',
    type: '하우스',
    useStatus: '미사용',
    sensorRes: [
      {
        code: 'sensor-021',
        name: '근권센서21',
        type: 'EC',
      },
      {
        code: 'sensor-022',
        name: '근권센서22',
        type: '온도',
      },
    ],
  },
  {
    name: '센서킷12',
    code: 'sensorkit-012',
    mac: 'E84764102AF3',
    status: '정상',
    type: '노지',
    useStatus: '사용중',
    sensorRes: [
      {
        code: 'sensor-023',
        name: '근권센서23',
        type: '온도',
      },
      {
        code: 'sensor-024',
        name: '근권센서24',
        type: 'PH',
      },
    ],
  },
  {
    name: '센서킷13',
    code: 'sensorkit-013',
    mac: 'E843C2A796FB',
    status: '정상',
    type: '하우스',
    useStatus: '사용중',
    sensorRes: [
      {
        code: 'sensor-025',
        name: '근권센서25',
        type: 'PH',
      },
      {
        code: 'sensor-026',
        name: '근권센서26',
        type: '습도',
      },
    ],
  },
  {
    name: '센서킷14',
    code: 'sensorkit-014',
    mac: 'E89D84E103FB',
    status: '정상',
    type: '노지',
    useStatus: '미사용',
    sensorRes: [
      {
        code: 'sensor-027',
        name: '근권센서27',
        type: 'PH',
      },
      {
        code: 'sensor-028',
        name: '근권센서28',
        type: 'EC',
      },
    ],
  },
  {
    name: '센서킷15',
    code: 'sensorkit-015',
    mac: 'E83E033592A3',
    status: '정상',
    type: '하우스',
    useStatus: '미사용',
    sensorRes: [
      {
        code: 'sensor-029',
        name: '근권센서29',
        type: 'PH',
      },
      {
        code: 'sensor-030',
        name: '근권센서30',
        type: 'PH',
      },
    ],
  },
  {
    name: '센서킷16',
    code: 'sensorkit-016',
    mac: 'E883593FE9D2',
    status: '정상',
    type: '노지',
    useStatus: '미사용',
    sensorRes: [
      {
        code: 'sensor-031',
        name: '근권센서31',
        type: '습도',
      },
      {
        code: 'sensor-032',
        name: '근권센서32',
        type: 'EC',
      },
    ],
  },
  {
    name: '센서킷17',
    code: 'sensorkit-017',
    mac: 'E8E37B6490AC',
    status: '정상',
    type: '하우스',
    useStatus: '미사용',
    sensorRes: [
      {
        code: 'sensor-033',
        name: '근권센서33',
        type: 'PH',
      },
      {
        code: 'sensor-034',
        name: '근권센서34',
        type: 'PH',
      },
    ],
  },
  {
    name: '센서킷18',
    code: 'sensorkit-018',
    mac: 'E869685A3B10',
    status: '정상',
    type: '하우스',
    useStatus: '사용중',
    sensorRes: [
      {
        code: 'sensor-035',
        name: '근권센서35',
        type: 'PH',
      },
      {
        code: 'sensor-036',
        name: '근권센서36',
        type: 'EC',
      },
    ],
  },
  {
    name: '센서킷19',
    code: 'sensorkit-019',
    mac: 'E8BCF44FD141',
    status: '정상',
    type: '노지',
    useStatus: '미사용',
    sensorRes: [
      {
        code: 'sensor-037',
        name: '근권센서37',
        type: '온도',
      },
      {
        code: 'sensor-038',
        name: '근권센서38',
        type: 'EC',
      },
    ],
  },
  {
    name: '센서킷20',
    code: 'sensorkit-020',
    mac: 'E8F83DB55100',
    status: '정상',
    type: '하우스',
    useStatus: '미사용',
    sensorRes: [
      {
        code: 'sensor-039',
        name: '근권센서39',
        type: '습도',
      },
      {
        code: 'sensor-040',
        name: '근권센서40',
        type: 'EC',
      },
    ],
  },
]
