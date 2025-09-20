import { StudentProvince, StudentRegion } from "@/types/generated";

/**
 * Maps provinces to their corresponding regions based on Mongolian administrative divisions
 */
export const getRegionByProvince = (
  province: StudentProvince
): StudentRegion => {
  const provinceToRegionMap: Record<StudentProvince, StudentRegion> = {
    // BARUUN region provinces
    [StudentProvince.BayanUlgii]: StudentRegion.Baruun,
    [StudentProvince.GoviAltai]: StudentRegion.Baruun,
    [StudentProvince.Zavkhan]: StudentRegion.Baruun,
    [StudentProvince.Uvs]: StudentRegion.Baruun,
    [StudentProvince.Khovd]: StudentRegion.Baruun,

    // GOVI region provinces
    [StudentProvince.Bayankhongor]: StudentRegion.Govi,
    [StudentProvince.Dundogvi]: StudentRegion.Govi,
    [StudentProvince.Uvurkhangai]: StudentRegion.Govi,
    [StudentProvince.Umnugovi]: StudentRegion.Govi,

    // TUV region provinces
    [StudentProvince.Arkhangai]: StudentRegion.Tuv,
    [StudentProvince.Bulgan]: StudentRegion.Tuv,
    [StudentProvince.DarhanUul]: StudentRegion.Tuv,
    [StudentProvince.Orkhon]: StudentRegion.Tuv,
    [StudentProvince.Selenge]: StudentRegion.Tuv,
    [StudentProvince.Tuv]: StudentRegion.Tuv,
    [StudentProvince.Khuvsgul]: StudentRegion.Tuv,

    // ZUUN region provinces
    [StudentProvince.Dornogovi]: StudentRegion.Zuun,
    [StudentProvince.Dornod]: StudentRegion.Zuun,
    [StudentProvince.Govisumber]: StudentRegion.Zuun,
    [StudentProvince.Sukhbaatar]: StudentRegion.Zuun,
    [StudentProvince.Khenti]: StudentRegion.Zuun,

    // ULAANBAATAR region
    [StudentProvince.Ulaanbaatar]: StudentRegion.Ulaanbaatar,
    [StudentProvince.Baganuur]: StudentRegion.Ulaanbaatar,
    [StudentProvince.Bayangol]: StudentRegion.Ulaanbaatar,
    [StudentProvince.Bayanzurkh]: StudentRegion.Ulaanbaatar,
    [StudentProvince.Nalaikh]: StudentRegion.Ulaanbaatar,
    [StudentProvince.Songinokhairkhan]: StudentRegion.Ulaanbaatar,
    [StudentProvince.SukhbaatarDuureg]: StudentRegion.Ulaanbaatar,
    [StudentProvince.KhanUul]: StudentRegion.Ulaanbaatar,
    [StudentProvince.Chingeltei]: StudentRegion.Ulaanbaatar,
    [StudentProvince.Bagahangai]: StudentRegion.Ulaanbaatar,
  };

  return provinceToRegionMap[province];
};
