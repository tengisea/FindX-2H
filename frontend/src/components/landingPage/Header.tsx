"use client";
import PillNav from "./PillNav";

export const Header = () => {
  const logo = "/images/Lucid.jpg";
  const navItems = [
    {
      label: "Home",
      href: "/",
      ariaLabel: "Go to home page",
    },
    {
      label: "FindX",
      href: "/landing-page",
      ariaLabel: "Go to landing page",
    },
    {
      label: "Host",
      href: "/host",
      ariaLabel: "Host a competition",
    },
    {
      label: "Student",
      href: "/student",
      ariaLabel: "Student portal",
    },
    {
      label: "Example",
      href: "/example",
      ariaLabel: "Host a competition",
    },
  ];

  const handleMobileMenuClick = () => {
    console.log("Mobile menu toggled");
  };

  return (
    <div className="relative w-full flex justify-end pr-20 items-center">
      <PillNav
        logo={logo}
        logoAlt="Open Platform - Educational Excellence"
        items={navItems}
        activeHref={"/"}
        className="flex justify-center items-center"
        ease="power3.easeOut"
        baseColor="#D9EFF7"
        pillColor="#9BBBFC"
        hoveredPillTextColor="#9BBBFC"
        pillTextColor="#4741A6"
        onMobileMenuClick={handleMobileMenuClick}
        initialLoadAnimation={true}
      />
    </div>
  );
};

// export const HeaderWithActiveTracking = () => {
//   const router = useRouter();
//   // const pathname = usePathname();

//   const navItems = [
//     {
//       label: "Landing",
//       href: "/landing-page",
//       ariaLabel: "Go to landing page"
//     },
//     {
//       label: "Home",
//       href: "/",
//       ariaLabel: "Go to home page"
//     },
//     {
//       label: "Results",
//       href: "/results",
//       ariaLabel: "View results"
//     },
//     {
//       label: "Host",
//       href: "/example",
//       ariaLabel: "Host a competition"
//     },
//     {
//       label: "Student",
//       href: "/student",
//       ariaLabel: "Student portal"
//     }
//   ];

// const handleMobileMenuClick = () => {
//   console.log("Mobile menu toggled");
// };

//   return (
//     <div className="relative w-full flex justify-center items-center px-4 sm:px-6 lg:px-8">
//       <PillNav
//         logo="/images/Lucid.jpg"
//         logoAlt="Open Platform - Educational Excellence"
//         items={navItems}
//         activeHref={"/landing-page"}
//         className="flex justify-center items-center w-full max-w-4xl"
//         ease="power3.easeOut"
//         baseColor="#D9EFF7"
//         pillColor="#9BBBFC"
//         hoveredPillTextColor="#9BBBFC"
//         pillTextColor="#4741A6"
//         onMobileMenuClick={handleMobileMenuClick}
//         initialLoadAnimation={true}
//       />
//     </div>
//   );
// };

// export const HeaderWrapper = () => {
//   return (
//     <header className="relative w-full bg-transparent min-h-[80px]">
//       <div className="absolute top-4 left-4 z-[1001]">
//         <img
//           src="/images/Lucid.jpg"
//           alt="Logo"
//           className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
//           onClick={() => window.location.href = '/'}
//         />
//       </div>

//       <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center pt-4">
//         <HeaderWithActiveTracking />
//       </div>
//     </header>
//   );
// };
