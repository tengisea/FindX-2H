// Province mapping utility for converting database codes to Mongolian province names

export const getProvinceName = (provinceCode: string): string => {
  const provinceMap: { [key: string]: string } = {
    ARKHANGAI: "Архангай",
    BAYAN_OLGII: "Баян-Өлгий",
    BAYANKHONGOR: "Баянхонгор",
    BULGAN: "Булган",
    GOVI_ALTAI: "Говь-Алтай",
    GOVISUMBER: "Говьсүмбэр",
    DARKHAN_UUL: "Дархан-Уул",
    DORNOGOVI: "Дорноговь",
    DORNOD: "Дорнод",
    DUNDGOVI: "Дундговь",
    ZAVKHAN: "Завхан",
    ORKHON: "Орхон",
    OVORKHANGAI: "Өвөрхангай",
    OMNOGOVI: "Өмнөговь",
    SUKHBAATAR: "Сүхбаатар",
    SUKHBAATAR_DUUREG: "Сүхбаатар дүүрэг",
    SELENGE: "Сэлэнгэ",
    TOV: "Төв",
    UVS: "Увс",
    KHOVD: "Ховд",
    KHOVSGOL: "Хөвсгөл",
    KHENTII: "Хэнтий",
  };

  return provinceMap[provinceCode.toUpperCase()] || provinceCode;
};

// Export all province names for reference
export const PROVINCE_NAMES = {
  ARKHANGAI: "Архангай",
  BAYAN_OLGII: "Баян-Өлгий",
  BAYANKHONGOR: "Баянхонгор",
  BULGAN: "Булган",
  GOVI_ALTAI: "Говь-Алтай",
  GOVISUMBER: "Говьсүмбэр",
  DARKHAN_UUL: "Дархан-Уул",
  DORNOGOVI: "Дорноговь",
  DORNOD: "Дорнод",
  DUNDGOVI: "Дундговь",
  ZAVKHAN: "Завхан",
  ORKHON: "Орхон",
  OVORKHANGAI: "Өвөрхангай",
  OMNOGOVI: "Өмнөговь",
  SUKHBAATAR: "Сүхбаатар",
  SUKHBAATAR_DUUREG: "Сүхбаатар дүүрэг",
  SELENGE: "Сэлэнгэ",
  TOV: "Төв",
  UVS: "Увс",
  KHOVD: "Ховд",
  KHOVSGOL: "Хөвсгөл",
  KHENTII: "Хэнтий",
} as const;
